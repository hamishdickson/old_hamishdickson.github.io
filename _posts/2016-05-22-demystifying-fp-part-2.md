---
layout: post
title:  "Demystifying Functional Programming: part 2a - tools of the trade"
date:   2016-05-22 08:44:26 +0100
categories: functional programming
---


## To map a Mockingbird

In my [last post](http://hamishdickson.github.io/functional/programming/2016/05/13/demystifying-fp-part-1.html) I gave a very hand wavy, rough outline of what we mean by functional programming. This post is going to be much more hands on - if you have Scala installed, then feel free to follow along using Scala's REPL - this post has been compiled using [something very cool called tut](https://github.com/tpolecat/tut) so all the code snippets should just work out the box.

Today we're going to use common functional programming ideas to build a linked list, then we're going to do a bit of playing and discover a really cool, general idea from Category theory.

## Linked Lists

Linked lists are the basic collection favored by FP. You would normally see linked lists in FP where you would see an array in other languages.

Part of that is probably historical (Lisp actually stands for "LISt Processor" after all), but it also comes down to the fact that arrays let you mutate elements in place, while linked lists do not.....

.... well at least the ones we're going to look at - this becomes waaaaaaaaaaay more [complicated when you try to implement a full language](http://tpolecat.github.io/2013/11/13/list.html) when you have to be useful to as many programmers as possible ... and fast ... and correct...

Quick refresh: a [linked list](https://en.wikipedia.org/wiki/Linked_list) is a recursive structure made up of a `head` and a `tail`. The head is an element in the list and the tail is the remainder of the list. An empty list is represented by it's own thing called `Nil` (in Scala anyway)

Visually, a list with elements 12, 99 and 37 would look a little like this

![linked list](https://upload.wikimedia.org/wikipedia/commons/6/6d/Singly-linked-list.svg)

## Algebraic something something...

So how would you define a linked list?

If you try and do this yourself (I recommend you try) you'll quickly realise you need to encode a structure of the form "I have a `foo`, that `foo` can either be a `bar` or a `baz` but nothing else"

Let's take a detour and have a think about this problem, maybe we can build up something that's more general (shocker... we can).

How would you go about this? Well, in a language like java you might create an interface called `Foo` and then extend it with some classes called `Bar` and `Baz`.

```java
interface Foo { ... }

final class Bar extends Foo { ... }

final class Baz extends Foo { ... }
```

There is an issue here which you have probably already spotted, how do we do the "_... but nothing else_" part? You could extend this interface anywhere we want to refer to it ... meaning we have no real way of preventing further extension.

To be honest, I have no idea how you'd do this. The central problem is you have to allow access to `Foo`, but not allow people to extend it at the same time. That's a language limitation.

Most functional languages have a special feature to solve this. It's called an [Algebraic Data Type](https://en.wikipedia.org/wiki/Algebraic_data_type) (ADT).

Since this is a language specific thing and we're using Scala for our examples we will look at Scala's implementation. This _looks_ different in Haskell, but is the same central idea.

In Scala you have an access modifier called `sealed`. A `sealed trait` (think of a `trait` as somewhere between an `interface` and an `abstract class`) can only be extended inside the same file as your `trait`.

```scala
scala> sealed trait Foo
defined trait Foo

scala> final case object Bar extends Foo
defined object Bar

scala> final case object Baz extends Foo
defined object Baz
```

This is great - using this we _know for a fact_ that if we have a `Foo`, the only possible implementations of it are a `Bar` or a `Baz`!

Let's go back to our linked list - how would we encode that?

```scala
scala> sealed trait List[+A]
defined trait List

scala> final case object Nil extends List[Nothing]
defined object Nil

scala> final case class Cons[+A](head: A, tail: List[A]) extends List[A]
defined class Cons
```

So this is saying "I have a List of type `A`. It can either be `Nil` (remember that means empty) or an element `Cons` which has a `head` and a `tail`" (in most FP languages, the element is called `Cons`trct because that's what it was called in lisp).

From this, here's what a linked list would look like

```scala
scala> val ls: List[Int] = Cons(1, Cons(2, Nil))
ls: List[Int] = Cons(1,Cons(2,Nil))
```

Cool, that was actually pretty easy in the end. You could clean this up a bit and add constructors letting you write `List(1,2,3)`, but we've done the hard part.

## Pattern matching

Great, so now we know how to describe a linked list ... but how do we make use of it? Since we know our ADT is limited in what it can represent, wouldn't it be useful if we could exhaustively check all those options?

Lets go back to our `Foo` example and make it a little more interesting

```scala
scala> sealed trait Foo
defined trait Foo

scala> final case class Bar(v: String) extends Foo
defined class Bar

scala> final case class Baz(i: String, j: Int) extends Foo
defined class Baz
```

Before `Bar` and `Baz` couldn't hold anything, now they can hold (a different number of) values. If later on in our code we came across a `Foo` how would we know if the `Foo` is a `Bar` or not? How would we make use of it's value `v` if it was a `Bar`?

Again.. that's a language specific feature. The approach used by most functional languages is called _pattern matching_. If you're interested in _how_ this is done in Scala (which is what we're going to look at) it's implemented using an idea called [extractors](http://danielwestheide.com/blog/2012/11/21/the-neophytes-guide-to-scala-part-1-extractors.html)

Pattern matching lets you take an object, check it's structure and extract out any values it may have so you can use them.

In Scala we do this with the `match` and `case` keywords like so:

```scala
scala> def fooer(a: Foo): String = a match {
     |     case Bar(b) => b + "by"  // here I'm calling Bar's value b and using it on the right hand side
     |     case Baz(c, d) => c + ", number: " + d
     | }
fooer: (a: Foo)String

scala> val f: Foo = Bar("bob")
f: Foo = Bar(bob)

scala> val g: Foo = Baz("jim", 1)
g: Foo = Baz(jim,1)

scala> fooer(f)
res0: String = bobby

scala> fooer(g)
res1: String = jim, number: 1
```

That's actually pretty cool! Again, this is a feature most imperative languages don't have. I guess you could simulate it using `if (.. instanceOf ..)` and reflection everywhere but it would be at best ugly and at worst a breading place for awful, hard to detect bugs.

What's even cooler is since we know all the possibilities for `Foo` we can exhaustively check them all ... in fact Scala will give you a compiler warning if you don't check all the possibilities

```scala
scala> def fooer(a: Foo): String = a match {
     |     case Bar(b) => b + "by"
     | }
<console>:15: warning: match may not be exhaustive.
It would fail on the following input: Baz(_, _)
       def fooer(a: Foo): String = a match {
                                   ^
fooer: (a: Foo)String
```

## map

Great, let's take our ADT idea and pattern matching and do something interesting...

Imagine we have a list of `Int`s and we want to increase all it's elements by one. How would we do that?

Well, the best way would be to create a function which takes a list and returns a new one

```scala
scala> def addOner(ls: List[Int]): List[Int] = ???
addOner: (ls: List[Int])List[Int]
```

We know our list from before is made of `Nil` and `Cons` so let's try to use our pattern matching tool

```scala
scala> def addOner(ls: List[Int]): List[Int] = ls match {
     |     case Nil => ???
     |     case Cons(a, as) => ???
     | }
addOner: (ls: List[Int])List[Int]
```

Quick detour into FP naming conventions here - names in FP are deliberately short. The idea is that your function should be so general that giving things names like "intListElement" just become misleading. So instead we use single characters like `l` and `a` for single value names. When we have a collection of `l`s we use `ls` and we use capitals to represent types `F`, `A`.

So what do we want our function to do? Well, if we have an empty list, we should return an empty list - that's kind of a no brainer

```scala
scala> def addOner(ls: List[Int]): List[Int] = ls match {
     |     case Nil => Nil
     |     case Cons(a, as) => ???
     | }
addOner: (ls: List[Int])List[Int]
```

If the list isn't empty, then we can see a `head` (an element) and a `tail` (another `List'). What can we do here?

Well we know we want a new list, so we know our right hand side needs to look a bit like `Cons(...)` since that's how we build a list. We also know that we want to increase the elements of the first list by one, so it now looks like

```scala
scala> def addOner(ls: List[Int]): List[Int] = ls match {
     |     case Nil => Nil
     |     case Cons(a, as) => Cons((a + 1), ???)
     | }
addOner: (ls: List[Int])List[Int]
```

What can we do now? Well, we want to repeat this process again with `as`, so let's use recursion and pass it back to `addOner`

```scala
scala> def addOner(ls: List[Int]): List[Int] = ls match {
     |     case Nil => Nil
     |     case Cons(a, as) => Cons((a + 1), addOner(as))
     | }
addOner: (ls: List[Int])List[Int]

scala> val l1 = Cons(1, Cons(2, Cons(3, Nil)))
l1: Cons[Int] = Cons(1,Cons(2,Cons(3,Nil)))

scala> val l2 = addOner(l1)
l2: List[Int] = Cons(2,Cons(3,Cons(4,Nil)))
```

Awesome!

Recursion is used a lot in functional programming. Recursion gets a bad rap in some languages since it's not stack safe, in fact there are ways round this and Scala (and many other languages) support something called [tail recursion](https://anadea.info/blog/tail-recursion-in-scala) which does offer stack safety.

Creating a specific function just to add one to each element in a list is kind of dumb, what if we wanted to do something else? Say, multiply each element by 5?

```scala
scala> def byFiver(ls: List[Int]): List[Int] = ls match {
     |     case Nil => Nil
     |     case Cons(a, as) => Cons((a * 5), byFiver(as))
     | }
byFiver: (ls: List[Int])List[Int]

scala> val l3 = byFiver(l1)
l3: List[Int] = Cons(5,Cons(10,Cons(15,Nil)))
```

Obviously this is pretty similar looking to the last function. Conceptually what we're doing is creating a function, which applies a second function to each element in the list.

In functional languages, functions can be passed as variables. So let's refactor and do that

```scala
scala> def generalListChanger(ls: List[Int], f: Int => Int): List[Int] = ls match {
     |     case Nil => Nil
     |     case Cons(a, as) => Cons(f(a), generalListChanger(as, f))
     | }
generalListChanger: (ls: List[Int], f: Int => Int)List[Int]
```

Now if we want to do our first calculation again we pass in the function we want to use

```scala
scala> val l4 = generalListChanger(l1, i => i + 1)
l4: List[Int] = Cons(2,Cons(3,Cons(4,Nil)))
```

So we have a function that takes a list and a function and applies that element to every element. We can also generalise this away from `Int`s like so

```scala
scala> def generalListChanger[A](ls: List[A], f: A => A): List[A] = ls match {
     |     case Nil => Nil
     |     case Cons(a, as) => Cons(f(a), generalListChanger(as, f))
     | }
generalListChanger: [A](ls: List[A], f: A => A)List[A]
```

But if we wanted to have a slightly more general function, taking things from `Int`s to `Int`s is kind of limiting - it's normal for a function to take elements from some domain `A` to a different codomain `B`, i.e. `f: A => B`

```scala
scala> def generalListChanger[A,B](ls: List[A], f: A => B): List[B] = ls match {
     |     case Nil => Nil
     |     case Cons(a, as) => Cons(f(a), generalListChanger(as, f))
     | }
generalListChanger: [A, B](ls: List[A], f: A => B)List[B]
```
That sounds like it would be useful for collections other than lists right? What about a Set, how would the signature of that look?

```scala
scala> def generalSetChanger[A,B](ss: Set[A], f: A => B): Set[B] = ???
generalSetChanger: [A, B](ss: Set[A], f: A => B)Set[B]
```

You can kind of see where this is going - we abstract out the collection:

```scala
scala> def generalCollectionChanger[F[_],A,B](ls: F[A], f: A => B): F[B] = ???
warning: there was one feature warning; for details, enable `:setting -feature' or `:replay -feature'
generalCollectionChanger: [F[_], A, B](ls: F[A], f: A => B)F[B]
```

This function looks really useful and in fact it is, we've created what's known as `map` in maths. A `map` maps elements from one collection to another and does it in such a way that the size of the collection remains the same.

Here we've built up `map` using collections, but it's not an idea limited to collections - for example consider `Option`. An `Option` can either have a value (wrapped in a `Some`) or not (`None`). `map` makes sense here as an operation - we can map values in `Some` to other values

```scala
scala> val o: Option[Int] = Option(1)
o: Option[Int] = Some(1)

scala> def map[A,B](o: Option[A], f: A => B): Option[B] = o match {
     |     case None => None
     |     case Some(a) => Some(f(a))
     | }
map: [A, B](o: Option[A], f: A => B)Option[B]

scala> map[Int, Int](o, _ + 3)
res2: Option[Int] = Some(4)
```

In category theory anything where `map` makes sense is called a _functor_.

```scala
scala> import scala.language.higherKinds
import scala.language.higherKinds

scala> trait Functor[F[_]] {
     |     def map[A, B](fa: F[A])(f: A => B): F[B]
     | }
defined trait Functor
```

This process of abstracting and abstracting is used a lot in FP. Often when you work like this you discover very general concepts - for example you might not immediately see that our list and our option both implement `map` - it feels more like a collections thing than anything to do with option!

## Next time...

OK we've done a huge amount here so I'll stop there. Hopefully from this you now have a general idea of the tools used by functional hipsters and can understand how powerful they are in creating code (the tools, not the hipsters).

Next up, I want to talk about folds and flatMap...
