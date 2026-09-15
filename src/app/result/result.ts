import { Component } from '@angular/core';
import { IdePanelComponent } from '../shared/ide-panel/ide-panel.component';

@Component({
  selector: 'app-result',
  imports: [IdePanelComponent],
  templateUrl: './result.html',
  styleUrl: './result.css'
})
export class ResultComponent {

  codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `public sealed interface Result<T> {
    record Success<T>(T value) implements Result<T> {}
    record Failure<T>(Error error) implements Result<T> {}

    default boolean isSuccess() {
        return this instanceof Success<T>;
    }

    static <T> Result<T> success(T value) {
        return new Success<>(value);
    }

    static <T> Result<T> failure(Error error) {
        return new Failure<>(error);
    }
}

public class UserService {
    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public Result<User> findUser(long id) {
        return repository.findById(id)
            .<Result<User>>map(Result::success)
            .orElseGet(() -> Result.failure(new Error("User not found")));
    }
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `sealed class Result<out T> {
    data class Success<T>(val value: T) : Result<T>()
    data class Failure<T>(val error: Throwable) : Result<T>()

    companion object {
        fun <T> success(value: T): Result<T> = Success(value)
        fun <T> failure(error: Throwable): Result<T> = Failure(error)
    }
}

class UserService(private val repository: UserRepository) {

    fun findUser(id: Long): Result<User> {
        return repository.findById(id)
            ?.let { Result.success(it) }
            ?: Result.failure(RuntimeException("User not found"))
    }
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `type Result<T> =
    | { success: true; value: T }
    | { success: false; error: Error };

function success<T>(value: T): Result<T> {
    return { success: true, value };
}

function failure<T>(error: Error): Result<T> {
    return { success: false, error };
}

class UserService {
    constructor(private repository: UserRepository) {}

    findUser(id: number): Result<User> {
        const user = this.repository.findById(id);
        return user
            ? success(user)
            : failure(new Error('User not found'));
    }
}`
    },
    Python: {
      lang: 'python',
      code: `from dataclasses import dataclass
from typing import Generic, TypeVar, Optional, Union

T = TypeVar("T")
E = TypeVar("E")

@dataclass
class Success(Generic[T, E]):
    value: T

@dataclass
class Failure(Generic[T, E]):
    error: E

Result = Union[Success[T, E], Failure[T, E]]

def success(value: T) -> Result[T, E]:
    return Success(value)

def failure(error: E) -> Result[T, E]:
    return Failure(error)

class UserService:
    def __init__(self, repository: UserRepository):
        self._repository = repository

    def find_user(self, user_id: int) -> Result[User, str]:
        user = self._repository.find_by_id(user_id)
        if user is not None:
            return success(user)
        return failure("User not found")`
    },
    'C#': {
      lang: 'csharp',
      code: `public record Result<T>
{
    public bool IsSuccess { get; init; }
    public T? Value { get; init; }
    public string? Error { get; init; }

    public static Result<T> Success(T value) =>
        new() { IsSuccess = true, Value = value };

    public static Result<T> Failure(string error) =>
        new() { IsSuccess = false, Error = error };
}

public class UserService
{
    private readonly IUserRepository _repository;

    public UserService(IUserRepository repository)
    {
        _repository = repository;
    }

    public Result<User> FindUser(long id)
    {
        var user = _repository.FindByIdAsync(id).GetAwaiter().GetResult();
        return user is not null
            ? Result<User>.Success(user)
            : Result<User>.Failure("User not found");
    }
}`
    }
  };
}