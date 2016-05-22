---
layout: post
title:  "Demystifying Functional Programming: part 2 - tools of the trade"
date:   2016-05-20 08:44:26 +0100
categories: functional programming
---


## Tools of the trade: 

In my [last post](http://hamishdickson.github.io/functional/programming/2016/05/13/demystifying-fp-part-1.html) I gave a very hand wavy, rough outline of what we mean when we talk about functional programming. In this post I'm going to do some agressive flapping and hope I manage to fly.

While the general principle of FP doesn't itself have much to do with Category theory, many of the tools people actually use are.

The tools I want to look at today are very general and can be used on a lot of collections as well as effects (note: not _side-effects_)

## map

Imagine we have some `List` of `Int`s and need a `List` with those elements all increased by one. How would we do this?

Well we might first try to mutate the elements in place, but as we talked about last time this is the FP equivalent of killing a puppy. The only thing we can do really is to create a new list with our updated elements.

```scala
scala> val l1 = List(1,2,3)
l1: List[Int] = List(1, 2, 3)

scala> def buildNewList(ls: List[Int]): List[Int] = ls match {
     |     case Nil => Nil
     |     case a :: as => (a + 1) :: buildNewList(as) 
     | }
buildNewList: (ls: List[Int])List[Int]

scala> val l2 = buildNewList(l1)
l2: List[Int] = List(2, 3, 4)
```

OK, if you're now to FP and Scala then there is quiet a bit doing on here.
- pattern matching
- recursion
- cons

Fundamentally however what we are doing is creating a function which takes a list and creates a new list of the same size (that bit is important)

Adding one to each element is kind of dumb, what if we wanted to do something else? Say, multiply each element by 5:

```scala
scala> val l1 = List(1,2,3)
l1: List[Int] = List(1, 2, 3)

scala> def buildNewList(ls: List[Int]): List[Int] = ls match {
     |     case Nil => Nil
     |     case a :: as => (a * 5) :: buildNewList(as) 
     | }
buildNewList: (ls: List[Int])List[Int]

scala> val l2 = buildNewList(l1)
l2: List[Int] = List(5, 10, 15)
```

Obviously this is pretty similar looking to the last function. Conceptually what we're doing is creating a function, which applys a second function to each element in the list. We can refactor this out like so:

```scala
scala> def buildNewList(ls: List[Int], f: Int => Int): List[Int] = ls match {
     |     case Nil => Nil
     |     case a :: as => f(a) :: buildNewList(as, f)
     | }
buildNewList: (ls: List[Int], f: Int => Int)List[Int]
```

Our first function now becomes:

```scala
scala> val l1 = List(1,2,3)
l1: List[Int] = List(1, 2, 3)

scala> def buildNewList(ls: List[Int], f: Int => Int): List[Int] = ls match {
     |     case Nil => Nil
     |     case a :: as => f(a) :: buildNewList(as, f)
     | }
buildNewList: (ls: List[Int], f: Int => Int)List[Int]

scala> val l2 = buildNewList(l1, i => i + 1)
l2: List[Int] = List(2, 3, 4)
```

So we have a function that takes a list and a function and applys that element to every element. We can generalise this away from Ints like so:

```scala
scala> def buildNewList[A](ls: List[A], f: A => A): List[A] = ls match {
     |     case Nil => Nil
     |     case a :: as => f(a) :: buildNewList(as, f)
     | }
buildNewList: [A](ls: List[A], f: A => A)List[A]
```

But if we wanted to have a slightly more general function, taking things from `Int`s to `Int`s is kind of limiting - it's normal for a function to take elements from some domain `A` to a different codomain `B`, ie `f: A => B`

```scala
scala> def buildNewList[A,B](ls: List[A], f: A => B): List[B] = ls match {
     |     case Nil => Nil
     |     case a :: as => f(a) :: buildNewList(as, f)
     | }
buildNewList: [A, B](ls: List[A], f: A => B)List[B]
```
That sounds like it would be useful for collections other than lists right? What about a Set, how would the signature of that look?

```scala
scala> def buildNewSet[A,B](ss: Set[A], f: A => B): Set[B] = ???
buildNewSet: [A, B](ss: Set[A], f: A => B)Set[B]
```

You can kind of see where this is going - we abstract out the collection:

```scala
scala> def builderThing[F[_],A](ls: F[A], f: A => A): F[A] = ???
warning: there was one feature warning; re-run with -feature for details
builderThing: [F[_], A](ls: F[A], f: A => A)F[A]
```

This function looks really useful and in fact it is, we've created what's known as `map` in maths. A `map` maps elements from one collection to another and does it in such a way that the size of the collection remains the same.

In fact, we can use `map` on objects which you wouldn't normally consider to be collections, for example `Option`

```scala
scala> val o = Option(1)
o: Option[Int] = Some(1)

scala> o.map(_.toString)
res0: Option[String] = Some(1)
```

Option isn't traditionally what you'd call a collection, but you can still write `map` for it - the idea is an extremely general one. In category theory this is called a _functor_. When it comes to code, you can think of a functor as anything that implements `map`, ie

```scala
scala> trait Functor[F[_]] {
     |     def map[A, B](fa: F[A])(f: A => B): F[B]
     | }
warning: there was one feature warning; re-run with -feature for details
defined trait Functor
```

Abstracting idaes out like this is called type classes and the subject of it's own blog post.

## flatMap >>=

In the vain of `map` we can define another function called `flatMap`

```scala
scala> def flatMap[F[_],A,B](fa: F[A], f: A => F[B]): F[B] = ???
warning: there was one feature warning; re-run with -feature for details
flatMap: [F[_], A, B](fa: F[A], f: A => F[B])F[B]
```

## folds


Next up: type classes and parametric polymorphism
