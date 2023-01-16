defmodule SpinTheWheel.Repo do
  use Ecto.Repo,
    otp_app: :spin_the_wheel,
    adapter: Ecto.Adapters.Postgres
end
