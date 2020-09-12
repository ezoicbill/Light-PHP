<?php

/**
 * Class created for executing the console commands when executing the framework from console
 * simple edit /config/console_commands for adding more commands
 */
class consoleController
{
    /**
     * Displays a list with all commands
     */
    public function list() {
        echo "\n
        list: display a list with all available commands \n
        help: shows help information about the console";
    }

    /**
     * Help information about the console commands
     */
    public function help() {
        echo "Are you sure you want to do this?  Type 'yes' to continue: ";
        $handle = fopen ("php://stdin","r");
        $line = fgets($handle);
        if(trim($line) != 'yes'){
            echo "ABORTING!\n";
            exit;
        }
        echo "\n";
        echo "Thank you, continuing...\n";
    }

    public function test($a, $b) {
        echo $a . " - " . $b;
    }

    /**
     * Executed when typing a wrong command
     */
    public function commandNotFound() {
        echo "Command not found!";
    }
}
