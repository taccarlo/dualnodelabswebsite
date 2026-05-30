import { Component, inject, HostListener } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { TranslatePipe } from '../i18n/translate.pipe';
import { TranslateService } from '../i18n/translate.service';
import packageJson from '../../../package.json';
import Prism from 'prismjs';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-csharp';

@Component({
  selector: 'app-adapter',
  imports: [RouterLink, NgFor, TranslatePipe],
  templateUrl: './adapter.html',
  styleUrl: './adapter.css'
})
export class AdapterComponent {
  version = packageJson.version;
  private translateService = inject(TranslateService);
  private sanitizer = inject(DomSanitizer);
  activeLang = 'Java';
  languages = ['Java', 'Kotlin', 'TypeScript', 'Python', 'C#'];
  copied = false;
  codeFlex = '4 1 0';
  infoFlex = '6 1 0';
  isDragging = false;
  private startX = 0;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) { if (!this.isDragging) return; this.doResize(e.clientX); }
  @HostListener('document:mouseup')
  onMouseUp() { this.isDragging = false; }

  onDividerDown(e: MouseEvent | TouchEvent) {
    e.preventDefault(); this.isDragging = true;
    this.startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
  }

  private doResize(clientX: number) {
    const dp = (document.querySelector('.dp-page') as HTMLElement);
    if (!dp) return;
    const rect = dp.getBoundingClientRect();
    const pct = (clientX - rect.left) / rect.width * 100;
    const clamped = Math.max(20, Math.min(70, pct));
    this.codeFlex = `${clamped} 1 0`;
    this.infoFlex = `${100 - clamped} 1 0`;
  }

  private codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `interface MediaPlayer {
    void play(String fileType, String fileName);
}

interface AdvancedMediaPlayer {
    void playVlc(String fileName);
    void playMp4(String fileName);
}

class VlcPlayer implements AdvancedMediaPlayer {
    public void playVlc(String fileName) {
        System.out.println("Playing VLC: " + fileName);
    }
    public void playMp4(String fileName) {}
}

class Mp4Player implements AdvancedMediaPlayer {
    public void playMp4(String fileName) {
        System.out.println("Playing MP4: " + fileName);
    }
    public void playVlc(String fileName) {}
}

class MediaAdapter implements MediaPlayer {
    AdvancedMediaPlayer advanced;

    MediaAdapter(String fileType) {
        if (fileType.equals("vlc"))
            advanced = new VlcPlayer();
        else if (fileType.equals("mp4"))
            advanced = new Mp4Player();
    }

    public void play(String fileType, String fileName) {
        if (fileType.equals("vlc"))
            advanced.playVlc(fileName);
        else if (fileType.equals("mp4"))
            advanced.playMp4(fileName);
    }
}

class AudioPlayer implements MediaPlayer {
    MediaAdapter adapter;

    public void play(String fileType, String fileName) {
        if (fileType.equals("mp3")) {
            System.out.println("Playing MP3: " + fileName);
        } else if (fileType.equals("vlc") || fileType.equals("mp4")) {
            adapter = new MediaAdapter(fileType);
            adapter.play(fileType, fileName);
        }
    }
}

public static void main(String[] args) {
    AudioPlayer player = new AudioPlayer();
    player.play("mp3", "song.mp3");
    player.play("mp4", "video.mp4");
    player.play("vlc", "movie.vlc");
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `interface MediaPlayer {
    fun play(fileType: String, fileName: String)
}

interface AdvancedMediaPlayer {
    fun playVlc(fileName: String)
    fun playMp4(fileName: String)
}

class VlcPlayer : AdvancedMediaPlayer {
    override fun playVlc(fileName: String) =
        println("Playing VLC: $fileName")
    override fun playMp4(fileName: String) {}
}

class Mp4Player : AdvancedMediaPlayer {
    override fun playMp4(fileName: String) =
        println("Playing MP4: $fileName")
    override fun playVlc(fileName: String) {}
}

class MediaAdapter(private val fileType: String) : MediaPlayer {
    private val advanced: AdvancedMediaPlayer = when (fileType) {
        "vlc" -> VlcPlayer()
        "mp4" -> Mp4Player()
        else -> throw IllegalArgumentException()
    }

    override fun play(fileType: String, fileName: String) = when (fileType) {
        "vlc" -> advanced.playVlc(fileName)
        "mp4" -> advanced.playMp4(fileName)
        else -> {}
    }
}

class AudioPlayer : MediaPlayer {
    override fun play(fileType: String, fileName: String) {
        when (fileType) {
            "mp3" -> println("Playing MP3: $fileName")
            "vlc", "mp4" -> MediaAdapter(fileType).play(fileType, fileName)
        }
    }
}

fun main() {
    AudioPlayer().apply {
        play("mp3", "song.mp3")
        play("mp4", "video.mp4")
        play("vlc", "movie.vlc")
    }
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `interface MediaPlayer {
    play(fileType: string, fileName: string): void;
}

interface AdvancedMediaPlayer {
    playVlc(fileName: string): void;
    playMp4(fileName: string): void;
}

class VlcPlayer implements AdvancedMediaPlayer {
    playVlc(fileName: string) { console.log("Playing VLC:", fileName); }
    playMp4(fileName: string) {}
}

class Mp4Player implements AdvancedMediaPlayer {
    playMp4(fileName: string) { console.log("Playing MP4:", fileName); }
    playVlc(fileName: string) {}
}

class MediaAdapter implements MediaPlayer {
    private advanced: AdvancedMediaPlayer;

    constructor(fileType: string) {
        if (fileType === "vlc") this.advanced = new VlcPlayer();
        else this.advanced = new Mp4Player();
    }

    play(fileType: string, fileName: string): void {
        if (fileType === "vlc") this.advanced.playVlc(fileName);
        else if (fileType === "mp4") this.advanced.playMp4(fileName);
    }
}

class AudioPlayer implements MediaPlayer {
    play(fileType: string, fileName: string): void {
        if (fileType === "mp3") {
            console.log("Playing MP3:", fileName);
        } else if (fileType === "vlc" || fileType === "mp4") {
            new MediaAdapter(fileType).play(fileType, fileName);
        }
    }
}

const player = new AudioPlayer();
player.play("mp3", "song.mp3");
player.play("mp4", "video.mp4");
player.play("vlc", "movie.vlc");`
    },
    Python: {
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class MediaPlayer(ABC):
    @abstractmethod
    def play(self, file_type: str, file_name: str): pass

class AdvancedMediaPlayer(ABC):
    @abstractmethod
    def play_vlc(self, file_name: str): pass
    @abstractmethod
    def play_mp4(self, file_name: str): pass

class VlcPlayer(AdvancedMediaPlayer):
    def play_vlc(self, file_name): print(f"Playing VLC: {file_name}")
    def play_mp4(self, file_name): pass

class Mp4Player(AdvancedMediaPlayer):
    def play_mp4(self, file_name): print(f"Playing MP4: {file_name}")
    def play_vlc(self, file_name): pass

class MediaAdapter(MediaPlayer):
    def __init__(self, file_type: str):
        if file_type == "vlc": self.advanced = VlcPlayer()
        else: self.advanced = Mp4Player()

    def play(self, file_type: str, file_name: str):
        if file_type == "vlc": self.advanced.play_vlc(file_name)
        elif file_type == "mp4": self.advanced.play_mp4(file_name)

class AudioPlayer(MediaPlayer):
    def play(self, file_type: str, file_name: str):
        if file_type == "mp3":
            print(f"Playing MP3: {file_name}")
        elif file_type in ("vlc", "mp4"):
            MediaAdapter(file_type).play(file_type, file_name)

player = AudioPlayer()
player.play("mp3", "song.mp3")
player.play("mp4", "video.mp4")
player.play("vlc", "movie.vlc")`
    },
    'C#': {
      lang: 'csharp',
      code: `public interface IMediaPlayer
{
    void Play(string fileType, string fileName);
}

public interface IAdvancedMediaPlayer
{
    void PlayVlc(string fileName);
    void PlayMp4(string fileName);
}

public class VlcPlayer : IAdvancedMediaPlayer
{
    public void PlayVlc(string fileName) =>
        Console.WriteLine($"Playing VLC: {fileName}");
    public void PlayMp4(string fileName) {}
}

public class Mp4Player : IAdvancedMediaPlayer
{
    public void PlayMp4(string fileName) =>
        Console.WriteLine($"Playing MP4: {fileName}");
    public void PlayVlc(string fileName) {}
}

public class MediaAdapter : IMediaPlayer
{
    private IAdvancedMediaPlayer _advanced;

    public MediaAdapter(string fileType)
    {
        _advanced = fileType switch
        {
            "vlc" => new VlcPlayer(),
            "mp4" => new Mp4Player(),
        };
    }

    public void Play(string fileType, string fileName)
    {
        if (fileType == "vlc") _advanced.PlayVlc(fileName);
        else if (fileType == "mp4") _advanced.PlayMp4(fileName);
    }
}

public class AudioPlayer : IMediaPlayer
{
    public void Play(string fileType, string fileName)
    {
        if (fileType == "mp3")
            Console.WriteLine($"Playing MP3: {fileName}");
        else if (fileType == "vlc" || fileType == "mp4")
            new MediaAdapter(fileType).Play(fileType, fileName);
    }
}

static void Main()
{
    var player = new AudioPlayer();
    player.Play("mp3", "song.mp3");
    player.Play("mp4", "video.mp4");
    player.Play("vlc", "movie.vlc");
}`
    }
  };

  get highlightedCode(): SafeHtml {
    const sample = this.codeSamples[this.activeLang];
    const html = Prism.highlight(sample.code, Prism.languages[sample.lang], sample.lang);
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getCode(lang: string): string { return this.codeSamples[lang]?.code || ''; }

  copyCode() {
    const code = this.getCode(this.activeLang);
    navigator.clipboard.writeText(code).then(() => {
      this.copied = true; setTimeout(() => this.copied = false, 2000);
    });
  }

  get currentLang() { return this.translateService.currentLang(); }
  toggleLanguage() { this.translateService.toggleLanguage(); }
}
