---
layout: post
title:  "Type classes in Scala"
date:   2016-06-05 08:44:26 +0100
categories: scala
---

Type classes are an idea which comes from Haskell.

Ad-hoc polymorphism

## Sorting

Imagine we have some function `sort`, which takes a list of type A and sorts it for us

```scala
scala> def sort[A](ls: List[A]): List[A] = ???
sort: [A](ls: List[A])List[A]
```

There is something missing from this. How do we actually sort `A`? We need some way to compare two `A`s and decide which one is greater. Doing this in general isn't easy since we compare `Int`s differently to `Strings` (for example). We need to pass that information into our sort function. Let's do that with something we will call 'Ord' (after `Ord` in Haskell)

```scala
scala> trait Ord[A]
defined trait Ord

scala> def sort[A](ls: List[A])(ord: Ord[A]): List[A] = ???
sort: [A](ls: List[A])(ord: Ord[A])List[A]
```

## Equality

In java, each class has an `equals` (and `hashCode`) method. Those methods let you compare two instances and decide if they are equal.


How would we approach defining equals here?
```
case class Foo[A](a: A)
```

Sounds easy... what about this?
```
case class Foo[A,B](f: A => B)
```

Does equality make sense? Turing showed you can't do this in general without solving the Halting problem

```scala
scala> def elem[A](x: A, ys: A): Boolean = ys match {
     |     case Nil => false
     |     case y :: ys => x == y || elem(x, ys)
     | }
elem: [A](x: A, ys: A)Boolean
```

```scala
scala> trait Eq[A] {
     |     def eq(a: A, b: A): Boolean
     | }
defined trait Eq
```


```scala
scala> def elem[A](x: A, ys: List[A])(implicit eq: Eq[A]): Boolean = ys match {
     |     case Nil => false
     |     case y :: ys => eq.eq(x, y)
     | }
elem: [A](x: A, ys: List[A])(implicit eq: Eq[A])Boolean
```

----
## Notes

- history
- what it gives you
- why you would want it over subtype polymorphism
- java's == isn't referentially transparent

```Haskell
x `elem` [] = False
x `elem` (y:ys) = x == y || (x `elem` ys)
```

What is the type of this? You think it would be

```Haskell
a -> [a] -> Bool
```

But `==` isn't defined for all types... and the above would imply it has type `a -> a -> Bool`

Comparing two lists of strings is different from comparing two lists of integers, it would be overloaded

Type classes to the rescue

```Haskell
class Eq a where
  (==) :: a -> a -> Bool
```

Eq is the name of the type class

```scala
scala> import cats._
import cats._

scala> import cats.data._
import cats.data._

scala> import cats.implicits._
import cats.implicits._

scala> import scala.language.higherKinds
import scala.language.higherKinds

scala> // import scala.language.higherKinds
     | 
     | def stackDepth: Int =
     |   Thread.currentThread.getStackTrace.length
stackDepth: Int

scala> def loopM[M[_] : Monad](m: M[Int], count: Int): M[Int] = {
     |   println(s"Stack depth $stackDepth")
     |   count match {
     |     case 0 => m
     |     case n => m.flatMap { _ => loopM(m, n - 1) }
     |   }
     | }
loopM: [M[_]](m: M[Int], count: Int)(implicit evidence$1: cats.Monad[M])M[Int]
```

```scala
scala> loopM(1.some, 5)
Stack depth 617
Stack depth 625
Stack depth 633
Stack depth 641
Stack depth 649
Stack depth 657
res2: Option[Int] = Some(1)
```
