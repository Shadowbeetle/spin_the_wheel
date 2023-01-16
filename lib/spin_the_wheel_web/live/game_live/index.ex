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
     |> assign(page_title: "Pick a name")
     |> assign(player: player)}
  end

  @impl
  def handle_event("spin", _params, socket) do
    player = socket.assigns.player

    random = Enum.random(0..2)

    {:ok, player} =
      case random do
        0 ->
          Players.update_player(player, %{balance: player.balance * 2})

        1 ->
          Players.update_player(player, %{balance: 0})

        2 ->
          {:ok, player}
      end

    {:noreply,
     socket |> assign(player: player) |> push_event("spin", %{result: @result_map[random]})}
  end
end
