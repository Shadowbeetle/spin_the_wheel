defmodule SpinTheWheel.Players.Player do
  use Ecto.Schema
  import Ecto.Changeset

  schema "players" do
    field :balance, :integer
    field :name, :string
    field :hiscore, :integer

    timestamps()
  end

  @doc false
  def changeset(player, attrs) do
    player
    |> cast(attrs, [:name, :balance, :hiscore])
    |> update_change(:name, &(&1 |> String.trim() |> String.upcase()))
    |> validate_required([:name])
  end
end
