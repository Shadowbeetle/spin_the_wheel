defmodule SpinTheWheel.PlayersFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `SpinTheWheel.Players` context.
  """

  @doc """
  Generate a unique player name.
  """
  def unique_player_name, do: "some name#{System.unique_integer([:positive])}"

  @doc """
  Generate a player.
  """
  def player_fixture(attrs \\ %{}) do
    {:ok, player} =
      attrs
      |> Enum.into(%{
        balance: 42,
        name: unique_player_name()
      })
      |> SpinTheWheel.Players.create_player()

    player
  end
end
