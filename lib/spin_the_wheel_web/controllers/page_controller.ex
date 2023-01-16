defmodule SpinTheWheelWeb.PageController do
  use SpinTheWheelWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
