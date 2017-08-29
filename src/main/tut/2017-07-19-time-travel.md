---
layout: post
title:  "Stateful time travel"
date:   2017-07-19 08:00:00 +0100
categories: tardis
---


# Stateful time travelling

```tut
import cats._, cats.data._, cats.implicits._

import State._

val program: State[Int, (Int, Int, Int)] = for {
    a <- get[Int]
    _ <- set[Int](a + 1)
    b <- get[Int]
    _ <- modify[Int](_ + 1)
    c <- inspect[Int, Int](_ * 1000)
} yield (a, b, c)

val (state, result) = program.run(1).value
```

## Reversing state

I basically translated this directly from Haskell

```tut
case class MonadFix[F](f: F) // need to see how this is defined

trait MonadRevState[S, M[_]] {
    def get(): MonadFix[S]
    def put(s: S): MonadFix[Unit]

    /*
     * from these, we can derive
     def state[A](f: S => (A, S)): MonadFix[A]
     def modify
     def gets

     see https://hackage.haskell.org/package/rev-state-0.1.2/docs/Control-Monad-RevState-Class.html
     */
}
```