import storageKey from "../variables/storageKey"
import types from "../store/types"
import pick from "lodash/pick"
import teamModule from "../store/modules/team"
import channelModule from "../store/modules/channel"
export default store => {
  const saveToLocalStorage = state => {
    const keys = ["tokens", "channelsOrder"]
    window.localStorage.setItem(storageKey, JSON.stringify(pick(state, keys)))
  }

  const registerTeamModule = team_id => {
    store.registerModule(["teams", team_id], teamModule)
  }
  const registerChannelModule = channelId => {
    store.registerModule(["channels", channelId], channelModule)
  }

  store.subscribe(async ({ type, payload }, state) => {
    switch (type) {
      case types.ADD_TOKEN:
        // 追加したtokenでteamモジュールを登録
        registerTeamModule(payload.team_id)
        await store.dispatch(`${payload.team_id}/${types.INITIALIZE}`, {
          access_token: payload.access_token,
        })
        await store.dispatch(types.CONNECT_RTM, payload)
        return saveToLocalStorage(state)

      case types.ADD_CHANNEL:
        // 追加したチャンネルをモジュール登録
        registerChannelModule(payload.channelId)
        await store.dispatch(`${payload.channelId}/${types.INITIALIZE}`, {
          access_token: state.teams[payload.team_id].access_token,
          channelId: payload.channelId,
        })
        return saveToLocalStorage(state)

      case types.REMOVE_CHANNEL:
        store.unregisterModule(["channels", payload.channelId])
        return saveToLocalStorage(state)
      case types.MOVE_RIGHT_CHANNEL:
        return saveToLocalStorage(state)
      case types.MOVE_LEFT_CHANNEL:
        return saveToLocalStorage(state)

      case types.RESTORE_FROM_LOCAL_STORAGE:
        // localStorageからの復元後
        // tokensがあればteamモジュールに登録したあとteamのinfoを取りに行く
        await Promise.all(
          state.tokens.map(({ team_id, access_token }) => {
            registerTeamModule(team_id)
            return store.dispatch(`${team_id}/${types.INITIALIZE}`, { access_token })
          }),
        )
        // state.channelOrderがあればmessageモジュールを登録する
        await Promise.all(
          state.channelsOrder.map(({ channelId, team_id }) => {
            registerChannelModule(channelId)
            const { access_token } = state.teams[team_id]
            return store.dispatch(`${channelId}/${types.INITIALIZE}`, { access_token, channelId })
          }),
        )
        await Promise.all(
          state.tokens.map(({ team_id, access_token }) => {
            return store.dispatch(types.CONNECT_RTM, { team_id, access_token })
          }),
        )
        // 初期化完了後にAppがコンポーネント表示
        store.commit(types.INITIALIZE)
        return
    }
  })
}
