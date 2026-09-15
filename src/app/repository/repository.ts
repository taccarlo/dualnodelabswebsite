import { Component } from '@angular/core';
import { IdePanelComponent } from '../shared/ide-panel/ide-panel.component';

@Component({
  selector: 'app-repository',
  imports: [IdePanelComponent],
  templateUrl: './repository.html',
  styleUrl: './repository.css'
})
export class RepositoryComponent {

  codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `public interface UserRepository {
    Optional<User> findById(long id);
    List<User> findAll();
    User save(User user);
    void deleteById(long id);
}

public class InMemoryUserRepository implements UserRepository {
    private final Map<Long, User> store = new HashMap<>();
    private long nextId = 1;

    @Override
    public Optional<User> findById(long id) {
        return Optional.ofNullable(store.get(id));
    }

    @Override
    public List<User> findAll() {
        return new ArrayList<>(store.values());
    }

    @Override
    public User save(User user) {
        user.setId(nextId++);
        store.put(user.getId(), user);
        return user;
    }

    @Override
    public void deleteById(long id) {
        store.remove(id);
    }
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `interface UserRepository {
    fun findById(id: Long): User?
    fun findAll(): List<User>
    fun save(user: User): User
    fun deleteById(id: Long)
}

class InMemoryUserRepository : UserRepository {
    private val store = mutableMapOf<Long, User>()
    private var nextId = 1L

    override fun findById(id: Long): User? = store[id]

    override fun findAll(): List<User> = store.values.toList()

    override fun save(user: User): User {
        user.id = nextId++
        store[user.id] = user
        return user
    }

    override fun deleteById(id: Long) {
        store.remove(id)
    }
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `interface UserRepository {
    findById(id: number): Promise<User | null>;
    findAll(): Promise<User[]>;
    save(user: User): Promise<User>;
    deleteById(id: number): Promise<void>;
}

class InMemoryUserRepository implements UserRepository {
    private store = new Map<number, User>();
    private nextId = 1;

    async findById(id: number): Promise<User | null> {
        return this.store.get(id) ?? null;
    }

    async findAll(): Promise<User[]> {
        return Array.from(this.store.values());
    }

    async save(user: User): Promise<User> {
        user.id = this.nextId++;
        this.store.set(user.id, user);
        return user;
    }

    async deleteById(id: number): Promise<void> {
        this.store.delete(id);
    }
}`
    },
    Python: {
      lang: 'python',
      code: `from abc import ABC, abstractmethod
from typing import Optional, List

class User:
    def __init__(self, id: Optional[int] = None, name: str = ""):
        self.id = id
        self.name = name

class UserRepository(ABC):
    @abstractmethod
    def find_by_id(self, user_id: int) -> Optional[User]:
        pass

    @abstractmethod
    def find_all(self) -> List[User]:
        pass

    @abstractmethod
    def save(self, user: User) -> User:
        pass

    @abstractmethod
    def delete_by_id(self, user_id: int) -> None:
        pass

class InMemoryUserRepository(UserRepository):
    def __init__(self):
        self._store: dict[int, User] = {}
        self._next_id = 1

    def find_by_id(self, user_id: int) -> Optional[User]:
        return self._store.get(user_id)

    def find_all(self) -> List[User]:
        return list(self._store.values())

    def save(self, user: User) -> User:
        user.id = self._next_id
        self._next_id += 1
        self._store[user.id] = user
        return user

    def delete_by_id(self, user_id: int) -> None:
        self._store.pop(user_id, None)`
    },
    'C#': {
      lang: 'csharp',
      code: `public interface IUserRepository
{
    Task<User?> FindByIdAsync(long id);
    Task<IEnumerable<User>> FindAllAsync();
    Task<User> SaveAsync(User user);
    Task DeleteByIdAsync(long id);
}

public class InMemoryUserRepository : IUserRepository
{
    private readonly Dictionary<long, User> _store = new();
    private long _nextId = 1;

    public Task<User?> FindByIdAsync(long id)
    {
        _store.TryGetValue(id, out var user);
        return Task.FromResult(user);
    }

    public Task<IEnumerable<User>> FindAllAsync()
    {
        return Task.FromResult((IEnumerable<User>)_store.Values);
    }

    public Task<User> SaveAsync(User user)
    {
        user.Id = _nextId++;
        _store[user.Id] = user;
        return Task.FromResult(user);
    }

    public Task DeleteByIdAsync(long id)
    {
        _store.Remove(id);
        return Task.CompletedTask;
    }
}`
    }
  };
}