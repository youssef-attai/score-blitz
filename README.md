# Point system

## Features

- Hosts can create temporary matches.
- Anonymous players can register
  in temporary matches.
- Hosts can define match rules.
- A match rule is defined like this:

```
{ "task" : "points" }
```

Where `task` is the action done by the player,
and `points` are the amount of points gained or lost
in return of doing this action.

- Hosts can define the winning and losing policies

Winning policies are:
- Only one player can win.
- Multiple players can win.

Losing policies are:
- Only one player can lose.
- Multiple players can lose.

- Hosts can define match end policies 
based on the selected winning and losing policies

Match end policies are:
- End match on win
- End match on loss
