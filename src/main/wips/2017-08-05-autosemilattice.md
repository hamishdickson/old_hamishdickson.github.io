---
layout: post
title:  "AutoSemilattice"
date:   2017-08-05 08:00:00 +0100
categories: semilattices
---

In [my last post](http://hamishdickson.github.io/semilattices/2017/07/12/semilattice-proof.html) I did a small, formal-ish proof that if you had a case class of semilattices, you could build a semilattice. This is building on that using shapeless and some law checking.

## TL; DR

A semilattice is an algebra where you can combine events in any order and can also handle repeated events.

My last post showed that if you have a `case class` where all the elements have semilattices, then so does the case class.

Lets built some code that lets you use this.


## Proof by induction

## Lets do it

```tut
import cats._, cats.data._, cats.implicits._, shapeless._


implicit def nhilSemilattice = new Semilattice[HNil] {
    def combine(a: HNil, b: HNil): HNil = HNil
}

implicit def hconsSemilattice[H, T <: HList](
    implicit
    hSemi: Semilattice[H],
    tSemi: Semilattice[T]
): Semilattice[H :: T] = new Semilattice[H :: T] {
    def combine(a: H :: T, b: H :: T): H :: T = hSemi.combine(a.head, b.head) :: tSemi.combine(a.tail, b.tail)
}
```