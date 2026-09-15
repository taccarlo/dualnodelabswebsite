import { Component } from '@angular/core';
import { IdePanelComponent } from '../shared/ide-panel/ide-panel.component';

@Component({
  selector: 'app-state',
  imports: [IdePanelComponent],
  templateUrl: './state.html',
  styleUrl: './state.css'
})
export class StateComponent {

  codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `public interface State {
    void play(Player player);
}

public class PlayingState implements State {
    @Override
    public void play(Player player) {
        System.out.println("Already playing, pausing...");
        player.setState(new PausedState());
    }
}

public class PausedState implements State {
    @Override
    public void play(Player player) {
        System.out.println("Resuming playback...");
        player.setState(new PlayingState());
    }
}

public class Player {
    private State state = new PausedState();

    public void setState(State state) {
        this.state = state;
    }

    public void play() {
        state.play(this);
    }
}

public class Main {
    public static void main(String[] args) {
        Player player = new Player();

        player.play(); // Resuming playback...
        player.play(); // Already playing, pausing...
        player.play(); // Resuming playback...
    }
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `interface State {
    fun play(player: Player)
}

class PlayingState : State {
    override fun play(player: Player) {
        println("Already playing, pausing...")
        player.setState(PausedState())
    }
}

class PausedState : State {
    override fun play(player: Player) {
        println("Resuming playback...")
        player.setState(PlayingState())
    }
}

class Player {
    private var state: State = PausedState()

    fun setState(state: State) {
        this.state = state
    }

    fun play() {
        state.play(this)
    }
}

fun main() {
    val player = Player()

    player.play() // Resuming playback...
    player.play() // Already playing, pausing...
    player.play() // Resuming playback...
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `interface State {
    play(player: Player): void;
}

class PlayingState implements State {
    play(player: Player): void {
        console.log("Already playing, pausing...");
        player.setState(new PausedState());
    }
}

class PausedState implements State {
    play(player: Player): void {
        console.log("Resuming playback...");
        player.setState(new PlayingState());
    }
}

class Player {
    private state: State = new PausedState();

    setState(state: State): void {
        this.state = state;
    }

    play(): void {
        this.state.play(this);
    }
}

const player = new Player();

player.play(); // Resuming playback...
player.play(); // Already playing, pausing...
player.play(); // Resuming playback...`
    },
    Python: {
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class State(ABC):
    @abstractmethod
    def play(self, player: "Player") -> None:
        pass

class PlayingState(State):
    def play(self, player: "Player") -> None:
        print("Already playing, pausing...")
        player.set_state(PausedState())

class PausedState(State):
    def play(self, player: "Player") -> None:
        print("Resuming playback...")
        player.set_state(PlayingState())

class Player:
    def __init__(self):
        self._state: State = PausedState()

    def set_state(self, state: State) -> None:
        self._state = state

    def play(self) -> None:
        self._state.play(self)

player = Player()

player.play()  # Resuming playback...
player.play()  # Already playing, pausing...
player.play()  # Resuming playback...`
    },
    'C#': {
      lang: 'csharp',
      code: `public interface IState
{
    void Play(Player player);
}

public class PlayingState : IState
{
    public void Play(Player player)
    {
        Console.WriteLine("Already playing, pausing...");
        player.SetState(new PausedState());
    }
}

public class PausedState : IState
{
    public void Play(Player player)
    {
        Console.WriteLine("Resuming playback...");
        player.SetState(new PlayingState());
    }
}

public class Player
{
    private IState _state = new PausedState();

    public void SetState(IState state) => _state = state;

    public void Play() => _state.Play(this);
}

public class Program
{
    public static void Main()
    {
        var player = new Player();

        player.Play(); // Resuming playback...
        player.Play(); // Already playing, pausing...
        player.Play(); // Resuming playback...
    }
}`
    }
  };
}