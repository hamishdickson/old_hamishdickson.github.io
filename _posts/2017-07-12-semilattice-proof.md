---
layout: post
title:  "Semilattices for the win"
date:   2017-07-12 08:00:00 +0100
categories: semilattices
---

_I work at [Drivetribe](https://drivetribe.com/) and we have a pretty cool CQRS architecture. You can find out more about that [here](https://data-artisans.com/blog/drivetribe-cqrs-apache-flink). This post is a formal proof about something we use every day at work._

# A bit of background

A common problem with distributed event driven systems is the loss of exactly-once guarantees. However you can design your system to process events "at _most_ once" or "at _least_ once".

"at _most_ once" isn't very helpful for a lot of systems. There are applications where the loss of data doesn't matter, but in general you want all your events to be processed.

That leaves us with "at least once". ie you could get the same event more than once to process.

To make things worse, depending on what you're doing it's also possible to get events out of order.

Both of these can be resolved using an algebra called a semilattice, definition below.

The rest of this post is a short formal proof that if you have some case class which is composed of semilattices, then it's always valid to treat your whole case class as a semilattice.

I'm planning to write a more post in the future about why this becomes a logical choice for dealing with the issues above.


# Proof that if (S, ⊕) forms a semilattice, then so does (case class C(s: S), ⊕')

A Semilattice consists of a set `S` and a closed binary operation `⊕` which is

1. associative, ie `∀ x, y, z ∈ S: x ⊕ (y ⊕ z) = (x ⊕ y) ⊕ z`
2. commutative, ie `∀ x, y ∈ S: x ⊕ y = y ⊕ x`
3. idempotent, ie `∀ x ∈ S: x ⊕ x = x`

The question is, if we have some type `S` and some binary function `⊕` which together form a Semilattice, then can we define a `case class C(s: S)` which is also a Semilattice?

Let's assume this is our semilattice type class (admittedly not that interesting, but I'm tut here and I'd like everything to compile)

```scala
scala> trait Semilattice[T] {
     |   def combine(a: T, b: T): T
     | }
defined trait Semilattice
```

Let's define an instance like this

```scala
scala> case class C[S](s: S)
defined class C

scala> implicit def cSemilattice[S](implicit sSemi: Semilattice[S]) = new Semilattice[C[S]] {
     |   def combine(c1: C[S], c2: C[S]): C[S] = C[S](sSemi.combine(c1.s, c2.s))
     | }
cSemilattice: [S](implicit sSemi: Semilattice[S])Semilattice[C[S]]
```

ie, in slightly nicer notation:

```
C(s1) ⊕' C(s2) = C(s1 ⊕ s2)    (**)
```


## Testing the semilattice laws

### Closure

We get this pretty much for free from Scala's type system.

### Associativity


```
if ∀ x, y, z ∈ S, then

∀ x', y', z' ∈ C: x' ⊕' (y' ⊕' z') = C(x) ⊕' (C(y) ⊕' C(z))
                                   = C(x) ⊕' (C(y ⊕ z))
                                   = C(x ⊕ (y ⊕ z))
                                   = C((x ⊕ y) ⊕ z)             by 1)
                                   = C(x ⊕ y) ⊕' C(z)           by (**)
                                   = (C(x) ⊕' C(y)) ⊕' C(z)     QED
```


### Commutativity

```
similarly, if ∀ x, y ∈ S, then

∀ x', y' ∈ C: x' ⊕' y' = C(x) ⊕' C(y)
                      = C(x ⊕ y)
                      = C(y ⊕ x)          by 2)
                      = C(y) ⊕' C(x)      by (**) QED
```


### Idempotence

```
similarly, if ∀ x ∈ S, then

∀ x' ∈ C: x' ⊕' x' = C(x) ⊕' C(x)
                      = C(x ⊕ x)
                      = C(x)             by 3)
                      = C(x)             QED
```


## More dimensions

this is easily expandable to case classes with an arbitary number of arguments like so

```scala
case class CN(s1: S1, s2: S2, ... sN: SN)
```


where `S1`, `S2`, ... `SN` all form semilattices with an associated combine operation

```scala
implicit def cSemilattice[S](implicit s1Semi: Semilattice[S1], s2Semi: Semilattice[S2], .. sNSemi: Semilattice[SN]) = new Semilattice[C[S1, S2, .. SN]] {
  def combine(c1: C[S1, S2, .. SN], c2: C[S1, S2, .. SN]): C[S1, S2, .. SN] = C[S1, S2, .. SN](s1Semi.combine(c1.s1, c2.s1), s2Semi.combine(c1.s2, c2.s2), .., sNSemi.combine(c1.sN, c2.sN))
}
```

You can generate this with a bit of [shapeless](https://github.com/milessabin/shapeless) magic.

Conceptually, you can think of this as a semilattice where each argument is treated as an orthogonal semilattice.
