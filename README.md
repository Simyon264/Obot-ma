# Obot-ma

## Intoduction
Obot-ma is a Discord bot intended for JCIGaming's Discord server. Originally created by Simyon, it was rebuilt from the ground up by Joshua Zacek, implementing a new database technology and cleaner code.<br>
By default, it comes with no commands, other than a few basic ones which interface with the database. However, Obot-ma was designed to be as modular as possible, so you can implement your own commands in just a matter of minutes.<br>

## Before using Obot-ma...

### PostgreSQL
The database used is PostgreSQL, and you'll need to install it on your machine to use Obot-ma. You can download and install Postgres [here](https://www.postgresql.org/download/). It is recommended to have a basic understanding of SQL.

### Node.js
You'll also need to install Node.js. You can download and install Node.js [here](https://nodejs.org/en/)

## Using Obot-ma for the first time

### Setup database
Open your command prompt, type `psql postgres` and you should see something like the command prompt below.<br>
<img width="50%" src="https://github.com/JoshuaZacek/Obot-ma/blob/database/psql.png?raw=true"><br>
Run `CREATE DATABASE obotma;`, then type `\q` to exit `psql`<br>
<img width="50%" src="https://github.com/JoshuaZacek/Obot-ma/blob/database/psql_create_db.png?raw=true"><br>
Type `psql obotma postgres` and run:
```sql
CREATE TABLE guilds (
    guild_id VARCHAR(255) NOT NULL UNIQUE,
    prefix VARCHAR(255),
    log_channel VARCHAR(255)
);
```
```sql
CREATE TABLE blocks (
    user_id VARCHAR(255) NOT NULL,
    guild_id VARCHAR(255) NOT NULL
);
```
<img width="50%" src="https://github.com/JoshuaZacek/Obot-ma/blob/database/psql_create_tables.png?raw=true"><br>
Then type `\q` to exit `psql`.

### Install dependencies
Clone the repo, then open a command promt at the Obot-ma folder (where you cloned the repo). Type `npm i` to install all the dependencies needed.<br>
That's it, now you're ready to run Obot-ma.

### Running Obot-ma
Type `node .` to run Obot-ma.

### On first start...
You'll be asked for your bot token, and a new config file will be generated for you.

# Adding your own commands
Adding your own commands is simple. To get started, create a `.js` file in the `/commands` directory.<br>
In your module exports, label the function you'd like to execute `run`.<br>

You'll want to make sure your `run` function accepts 3 parameters. In order from first to last:<br>
1. Discord Client object
2. Discord Message object
3. Arguments (anything after the first space in the message) 

## Module Exports
By defualt, our command can be run by anyone, and lacks documentation. This is where `module.exports` comes in. We can include information in our `module.exports` to control how our command is used. Think of it as configuration for your command. For example, we can restict commands to only be run by those who can ban memebers. We could also set documentation so users can understand what a command is supposed to do, and how it should be used.<br>

For this example, we'll say we want to create a `delete` command, which will delete a certain number of messages from the current channel, or another channel if specified in the paramters.

**Aliases**<br>
Datatype: *Array*<br>
Alternative names for your commands, which people can use. Make sure you aliases don't clash with command file names in the `commands/` directory, or they won't run. To disable aliases, remove this export. `delete.js`:
```js
module.exports = {
  aliases: ['d', 'del']
}
```
Now the bot will recognise `d` and `del` as `delete`.<br><br>

**Name**<br>
Datatype: *string*<br>
The name of your command. Used in the `help` command. Removing this export is not recommended. `delete.js`:
```js
module.exports = {
  aliases: ['d', 'del'],
  name: 'delete'
}
```
<br>

**About**<br>
Datatype: *string*<br>
Description of the command. Used in the `help` command. Removing this export is not recommended. `delete.js`:
```js
module.exports = {
  aliases: ['d', 'del'],
  name: 'delete',
  about: 'Deletes messages'
}
```
<br>

**Usage**<br>
Datatype: *string*<br>
How your command should be used. Used in the `help` command. Include parameters passed, and wrap them with <> to indicate required or [] to indicate optional. Removing this export is not recommended. `delete.js`:
```js
module.exports = {
  aliases: ['d', 'del'],
  name: 'delete',
  about: 'Deletes messages',
  usage: 'delete <number of message> [channel]'
}
```
<br>

**Category**<br>
Datatype: *string*<br>
What category your command fits into (e.g `Moderation`). Used in the `help` command. Not required, however your command will be treated as uncategorised. `delete.js`:
```js
module.exports = {
  aliases: ['d', 'del'],
  name: 'delete',
  about: 'Deletes messages from the current channel, or another one if specified.',
  usage: 'delete <number of message> [channel]',
  category: 'Moderation'
}
```
<br>

**Permission**<br>
Datatype: *string*<br>
Defines what Discord permission a Discord user needs to run the command. WARNING: Removing this export allows *anyone* to run this command. `delete.js`:
```js
module.exports = {
  aliases: ['d', 'del'],
  name: 'delete',
  about: 'Deletes messages',
  usage: 'delete <number of message> [channel]',
  category: 'Moderation',
  perms: 'ADMINISTRATOR'
}
```
Now only those who were assigned the Administrator permission can run this command.<br><br>

**Cooldown**<br>
Datatype: *int*<br>
How long a user has to wait before executing this command again in milliseconds. It is not recommended to set this value above 1000ms (1 second). WARNING: Not including this export, or setting the value to 0, will disable cooldown. `delete.js`:
```js
module.exports = {
  aliases: ['d', 'del'],
  name: 'delete',
  about: 'Deletes messages',
  usage: 'delete <number of message> [channel]',
  category: 'Moderation',
  perms: 'ADMINISTRATOR',
  cooldown: 1000
}
```
<br>

**Run**<br>
Datatype: *function*<br>
The function that should be run when the command is executed. `delete.js`:
```js
module.exports = {
  aliases: ['d', 'del'],
  name: 'delete',
  about: 'Deletes messages',
  usage: 'delete <number of message> [channel]',
  category: 'Moderation',
  perms: 'ADMINISTRATOR',
  cooldown: 1000,
  run: (client, message, args) => { // parameters
    // code goes here...
  }
}
```

## Config
The config is used to define what colors the message embeds should be.

## That's it folks...
You've reached the end of the documentation. You should know how to setup Obot-ma, run Obot-ma and add your own commands to Obot-ma.
