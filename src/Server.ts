import App from "./App";
import * as log from "loglevel";
import chalk from "chalk";

/**
 * Entry point
 *
 * @class
 * @author ale8k
 */
class Server {
    public constructor(logLevel: log.LogLevelDesc) {
        const serverPort = process.env.PORT ?? 8080;
        log.setDefaultLevel(logLevel);
        new App().setupServer().then(app => {
            const l = log.noConflict();
            l.info(chalk.dim.cyan("Spinning up server..."));
            app.listen(serverPort, () =>
                l.info(chalk.greenBright.bold(`Server running on PORT:${chalk.yellow(serverPort)}`))
            );
        });
    }
}

new Server("trace");
