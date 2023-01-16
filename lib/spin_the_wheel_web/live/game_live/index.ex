defmodule SpinTheWheelWeb.GameLive.Index do
  use SpinTheWheelWeb, :live_view

  alias SpinTheWheel.Players
  alias SpinTheWheel.Players.Player

  @impl true
  def mount(params, _session, socket) do
    player_name = params["player_name"]

    player = Players.get_player_by_name!(player_name)
    changeset = Players.change_player(%Player{})

    {:ok,
     socket
     |> assign(page_title: "Pick a name")
     |> assign(player: player)
     |> assign(changeset: changeset)}
  end
end
