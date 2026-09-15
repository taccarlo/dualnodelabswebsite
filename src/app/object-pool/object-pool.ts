import { Component } from '@angular/core';
import { IdePanelComponent } from '../shared/ide-panel/ide-panel.component';

@Component({
  selector: 'app-object-pool',
  imports: [IdePanelComponent],
  templateUrl: './object-pool.html',
  styleUrl: './object-pool.css'
})
export class ObjectPoolComponent {

  codeSamples: Record<string, { code: string; lang: string }> = {
    Java: {
      lang: 'java',
      code: `import java.util.LinkedList;
import java.util.Queue;

class Connection {
    private final String id;

    public Connection(String id) {
        this.id = id;
        System.out.println("Created connection " + id);
    }

    public void connect() {
        System.out.println("Using connection " + id);
    }
}

class ConnectionPool {
    private final Queue<Connection> pool = new LinkedList<>();
    private int nextId = 0;

    public Connection getConnection() {
        if (pool.isEmpty()) {
            return new Connection("conn-" + nextId++);
        }
        return pool.poll();
    }

    public void release(Connection conn) {
        pool.offer(conn);
    }
}

public class ObjectPoolDemo {
    public static void main(String[] args) {
        ConnectionPool pool = new ConnectionPool();

        Connection c1 = pool.getConnection();
        pool.release(c1);

        Connection c2 = pool.getConnection();
        System.out.println("Reused? " + (c1 == c2));
    }
}`
    },
    Kotlin: {
      lang: 'kotlin',
      code: `import java.util.LinkedList

class Connection(val id: String) {
    fun connect() {
        println("Using connection \$id")
    }
}

class ConnectionPool {
    private val pool = LinkedList<Connection>()
    private var nextId = 0

    fun getConnection(): Connection {
        if (pool.isEmpty()) {
            return Connection("conn-\${nextId++}")
        }
        return pool.poll()
    }

    fun release(conn: Connection) {
        pool.offer(conn)
    }
}

fun main() {
    val pool = ConnectionPool()
    val c1 = pool.getConnection()
    pool.release(c1)
    val c2 = pool.getConnection()
    println("Reused? \${c1 === c2}")
}`
    },
    TypeScript: {
      lang: 'typescript',
      code: `class Connection {
    constructor(public id: string) {}
}

class ConnectionPool {
    private pool: Connection[] = [];
    private nextId = 0;

    getConnection(): Connection {
        if (this.pool.length === 0) {
            return new Connection(\`conn-\${this.nextId++}\`);
        }
        return this.pool.pop()!;
    }

    release(conn: Connection): void {
        this.pool.push(conn);
    }
}

const pool = new ConnectionPool();
const c1 = pool.getConnection();
pool.release(c1);
const c2 = pool.getConnection();
console.log("Reused?", c1 === c2);`
    },
    Python: {
      lang: 'python',
      code: `from collections import deque


class Connection:
    def __init__(self, id_):
        self.id = id_
        print(f"Created connection {id_}")


class ConnectionPool:
    def __init__(self):
        self._pool = deque()
        self._next_id = 0

    def get_connection(self):
        if not self._pool:
            self._next_id += 1
            return Connection(f"conn-{self._next_id}")
        return self._pool.popleft()

    def release(self, conn):
        self._pool.append(conn)


pool = ConnectionPool()
c1 = pool.get_connection()
pool.release(c1)
c2 = pool.get_connection()
print("Reused?", c1 is c2)`
    },
    'C#': {
      lang: 'csharp',
      code: `using System;
using System.Collections.Generic;

public class Connection
{
    public string Id { get; }

    public Connection(string id)
    {
        Id = id;
        Console.WriteLine("Created connection " + id);
    }
}

public class ConnectionPool
{
    private readonly Queue<Connection> _pool = new Queue<Connection>();
    private int _nextId = 0;

    public Connection GetConnection()
    {
        if (_pool.Count == 0)
        {
            return new Connection("conn-" + _nextId++);
        }
        return _pool.Dequeue();
    }

    public void Release(Connection conn) => _pool.Enqueue(conn);
}

public static class Program
{
    public static void Main()
    {
        var pool = new ConnectionPool();
        var c1 = pool.GetConnection();
        pool.Release(c1);
        var c2 = pool.GetConnection();
        Console.WriteLine("Reused? " + ReferenceEquals(c1, c2));
    }
}`
    }
  };
}