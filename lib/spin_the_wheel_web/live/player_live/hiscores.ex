defmodule SpinTheWheelWeb.PlayerLive.Hiscores do
  use SpinTheWheelWeb, :live_view
  alias SpinTheWheel.Players

  @impl
  def mount(_params, _session, socket) do
    {:ok, socket |> assign(page_title: "Hiscores") |> assign(players: Players.list_players())}
  end
end
