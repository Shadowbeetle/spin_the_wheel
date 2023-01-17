defmodule SpinTheWheel.Repo.Migrations.CreatePlayers do
  use Ecto.Migration

  def change do
    create table(:players) do
      add :name, :string, null: false
      add :balance, :integer, null: false, default: 100
      add :hiscore, :integer, null: false, default: 0

      timestamps()
    end

    create unique_index(:players, [:name])
  end
end
