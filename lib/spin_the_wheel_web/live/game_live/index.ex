defmodule SpinTheWheelWeb.GameLive.Index do
  use SpinTheWheelWeb, :live_view

  alias SpinTheWheel.Players
  alias SpinTheWheel.Players.Player

  @result_map %{
    0 => "double",
    1 => "bankrupt",
    2 => "keep"
  }

  @impl true
  def mount(params, _session, socket) do
    player_name = params["player_name"]

    player = Players.get_player_by_name!(player_name)

    {:ok,
     socket
     |> assign(page_title: "Game")
     |> assign(player: player)
     |> assign(init_balance: player.balance)
     |> assign(init_hiscore: player.hiscore)}
  end

  @impl
  def handle_event("spin", _params, socket) do
    player = socket.assigns.player

    random = Enum.random(0..2)

    {:ok, player} =
      case random do
        0 ->
          new_balance = player.balance * 2
          new_hiscore = if new_balance > player.hiscore, do: new_balance, else: player.hiscore
          Players.update_player(player, %{balance: player.balance * 2, hiscore: new_hiscore})

        1 ->
          Players.update_player(player, %{balance: 0})

        2 ->
          if player.hiscore == 0 do
            Players.update_player(player, %{hiscore: player.balance})
          else
            {:ok, player}
          end
      end

    {:noreply,
     socket
     |> assign(player: player)
     |> push_event("spin", %{
       result: @result_map[random],
       newBalance: player.balance,
       newHiscore: player.hiscore
     })}
  end
end
