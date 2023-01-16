defmodule SpinTheWheel.Repo.Migrations.CreatePlayers do
  use Ecto.Migration

  def change do
    create table(:players) do
      add :name, :string
      add :balance, :integer, default: 100

      timestamps()
    end

    create unique_index(:players, [:name])
  end
end
