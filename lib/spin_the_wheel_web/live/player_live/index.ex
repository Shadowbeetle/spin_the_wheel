defmodule SpinTheWheelWeb.PlayerLive.Index do
  use SpinTheWheelWeb, :live_view

  alias SpinTheWheel.Players
  alias SpinTheWheel.Players.Player

  @impl true
  def mount(_params, _session, socket) do
    changeset = Players.change_player(%Player{})

    {:ok,
     socket
     |> assign(page_title: "Pick a name")
     |> assign(player: %Player{})
     |> assign(changeset: changeset)}
  end

  @impl true
  def handle_event("validate", %{"player" => player_params}, socket) do
    changeset =
      socket.assigns.player
      |> Players.change_player(player_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"player" => player_params}, socket) do
    case Players.create_player(player_params) do
      {:ok, player} ->
        {:noreply,
         socket
         |> push_redirect(to: Routes.game_index_path(socket, :index, player.name))}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end
end
