@Echo off
IF exist node_modules (
    echo =====================================
    echo ======= Starting Grunt release ======
    echo =====================================
    echo.
    grunt release
) else (
    echo =====================================
    echo = Installing Node modules for Grunt =
    echo =====================================
    echo.

    npm install

    echo.
    echo.
    echo.
    echo.
    echo =====================================
    echo ======= Starting Grunt release ======
    echo =====================================
    echo.

    grunt release
)