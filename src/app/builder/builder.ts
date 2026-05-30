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
  selector: 'app-builder',
  imports: [RouterLink, NgFor, TranslatePipe],
  templateUrl: './builder.html',
  styleUrl: './builder.css'
})
export class BuilderComponent {
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
  onMouseMove(e: MouseEvent) {
    if (!this.isDragging) return;
    this.doResize(e.clientX);
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging = false;
  }

  onDividerDown(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    this.isDragging = true;
    const cx = 'touches' in e ? e.touches[0].clientX : e.clientX;
    this.startX = cx;
  }

  private doResize(clientX: number) {
    const dp = (document.querySelector('.dp-page') as HTMLElement);
    if (!dp) return;
    const rect = dp.getBoundingClientRect();
    const pct = (clientX - rect.left) / rect.width * 100;
    const clamped = Math.max(30, Math.min(80, pct));
    this.codeFlex = `${clamped} 1 0`;
    this.infoFlex = `${100 - clamped} 1 0`;
  }

  private codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `public class User {
    private final String name;
    private final String email;
    private final int age;
    private final String phone;

    private User(Builder builder) {
        this.name = builder.name;
        this.email = builder.email;
        this.age = builder.age;
        this.phone = builder.phone;
    }

    public static class Builder {
        private String name;
        private String email;
        private int age;
        private String phone;

        public Builder name(String name) {
            this.name = name; return this;
        }
        public Builder email(String email) {
            this.email = email; return this;
        }
        public Builder age(int age) {
            this.age = age; return this;
        }
        public Builder phone(String phone) {
            this.phone = phone; return this;
        }
        public User build() {
            return new User(this);
        }
    }

    public static void main(String[] args) {
        User user = new User.Builder()
            .name("Alice")
            .email("alice@example.com")
            .age(30)
            .build();
    }
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `data class User(
    val name: String,
    val email: String,
    val age: Int = 0,
    val phone: String? = null
)

fun main() {
    val user = User(
        name = "Alice",
        email = "alice@example.com",
        age = 30
    )
    println(user)
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `class User {
    readonly name: string;
    readonly email: string;
    readonly age?: number;
    readonly phone?: string;

    constructor(builder: UserBuilder) {
        this.name = builder.name;
        this.email = builder.email;
        this.age = builder.age;
        this.phone = builder.phone;
    }
}

class UserBuilder {
    name!: string;
    email!: string;
    age?: number;
    phone?: string;

    setName(name: string): UserBuilder {
        this.name = name; return this;
    }
    setEmail(email: string): UserBuilder {
        this.email = email; return this;
    }
    setAge(age: number): UserBuilder {
        this.age = age; return this;
    }
    setPhone(phone: string): UserBuilder {
        this.phone = phone; return this;
    }
    build(): User {
        return new User(this);
    }
}

const user = new UserBuilder()
    .setName("Alice")
    .setEmail("alice@example.com")
    .setAge(30)
    .build();`
    },
    Python: {
      lang: 'python',
      code: `class User:
    def __init__(self, name, email, age=0, phone=None):
        self.name = name
        self.email = email
        self.age = age
        self.phone = phone


class UserBuilder:
    def set_name(self, name):
        self.name = name; return self
    def set_email(self, email):
        self.email = email; return self
    def set_age(self, age):
        self.age = age; return self
    def set_phone(self, phone):
        self.phone = phone; return self
    def build(self):
        return User(
            self.name, self.email,
            self.age, self.phone
        )

user = (UserBuilder()
    .set_name("Alice")
    .set_email("alice@example.com")
    .set_age(30)
    .build())`
    },
    'C#': {
      lang: 'csharp',
      code: `public class User
{
    public string Name { get; }
    public string Email { get; }
    public int Age { get; }
    public string? Phone { get; }

    private User(Builder builder)
    {
        Name = builder.Name;
        Email = builder.Email;
        Age = builder.Age;
        Phone = builder.Phone;
    }

    public class Builder
    {
        public string Name { get; private set; } = "";
        public string Email { get; private set; } = "";
        public int Age { get; private set; }
        public string? Phone { get; private set; }

        public Builder WithName(string name)
            { Name = name; return this; }
        public Builder WithEmail(string email)
            { Email = email; return this; }
        public Builder WithAge(int age)
            { Age = age; return this; }
        public Builder WithPhone(string phone)
            { Phone = phone; return this; }
        public User Build() => new(this);
    }

    static void Main()
    {
        var user = new Builder()
            .WithName("Alice")
            .WithEmail("alice@example.com")
            .WithAge(30)
            .Build();
    }
}`
    }
  };

  get highlightedCode(): SafeHtml {
    const sample = this.codeSamples[this.activeLang];
    const html = Prism.highlight(sample.code, Prism.languages[sample.lang], sample.lang);
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getCode(lang: string): string {
    return this.codeSamples[lang]?.code || '';
  }

  copyCode() {
    const code = this.getCode(this.activeLang);
    navigator.clipboard.writeText(code).then(() => {
      this.copied = true;
      setTimeout(() => this.copied = false, 2000);
    });
  }

  get currentLang() {
    return this.translateService.currentLang();
  }

  toggleLanguage() {
    this.translateService.toggleLanguage();
  }
}
