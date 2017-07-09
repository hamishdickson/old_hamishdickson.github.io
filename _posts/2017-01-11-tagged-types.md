---
layout: post
title:  "Type tags and multiple instances of type classes"
date:   2017-07-09 08:00:00 +0100
categories: tagged types
---

_Note: So I've just opened my blog repo to find this post basically completed but unpublished. I have no idea why I didn't publish it, but hey it's up now. Enjoy._

Type classes are a great way to do polymorphism, they are far better than subclassing, but they have a rather frustrating limitation - how do you deal with instances which share the same type?

Here I'm going to quickly show you the [shapless](https://github.com/milessabin/shapeless) tagged type to get around that problem.

## The problem

Imagine you have some type class. I'm going to use monoids as an example for this post. In scala the monoid type class would look like this

```scala
scala> trait Monoid[T] {
     |   def zero: T
     |   def combine(a: T, b: T): T
     | }
defined trait Monoid
```

Any instance should obey the [monoid laws](https://en.wikibooks.org/wiki/Haskell/Monoids).

There are lots of ways you can define monoids for the integers. One way is to use addition for combine and 0 for er... zero

```scala
scala> implicit val intAddMonoid = new Monoid[Int] {
     |   def zero: Int = 0
     |   def combine(a: Int, b: Int): Int = a + b
     | }
intAddMonoid: Monoid[Int] = $anon$1@2f905b10
```

Monoids can be folded, so lets create a simple wrapper that lets us fold over a list of `T` which has a monoid:

```scala
scala> def foldMonoidList[T](ts: List[T])(implicit M: Monoid[T]): T = 
     |   ts.foldRight(M.zero)(M.combine(_, _))
foldMonoidList: [T](ts: List[T])(implicit M: Monoid[T])T

scala> val ls = List(1,2,3,4)
ls: List[Int] = List(1, 2, 3, 4)

scala> foldMonoidList(ls)
res0: Int = 10
```

Now let's consider another monoid for the intergers, one defined using multiplication and 1:

```scala
scala> implicit val intMultMonoid = new Monoid[Int] {
     |   def zero: Int = 1
     |   def combine(a: Int, b: Int): Int = a * b
     | }
intMultMonoid: Monoid[Int] = $anon$1@19d3213f
```

and here we quickly run into a problem - how can we use both of these instances? Any reference to a `Monoid[Int]` is now ambiguous

```scala
scala> foldMonoidList(ls)
<console>:17: error: ambiguous implicit values:
 both value intAddMonoid of type => Monoid[Int]
 and value intMultMonoid of type => Monoid[Int]
 match expected type Monoid[Int]
       foldMonoidList(ls)
                     ^
```

Bummer.

## shapeless tagged types

Let's create a `trait` with a meaningful name for each of our types:

```scala
scala> trait Sum
defined trait Sum

scala> trait Mult
defined trait Mult
```

Using shapeless, we can define new types to reason about

```scala
scala> import shapeless._, shapeless.tag.@@
import shapeless._
import shapeless.tag.$at$at

scala> type SumInt = Int @@ Sum
defined type alias SumInt

scala> type MultInt = Int @@ Mult
defined type alias MultInt
```

We can then define our monoids in terms of these types:

```scala
scala> implicit val intSumMonoid = new Monoid[SumInt] {
     |   def zero: SumInt = ???
     |   def combine(a: SumInt, b: SumInt): SumInt = ???
     | }
intSumMonoid: Monoid[SumInt] = $anon$1@2668fd1

scala> implicit val intMultMonoid = new Monoid[MultInt] {
     |   def zero: MultInt = ???
     |   def combine(a: MultInt, b: MultInt): MultInt = ???
     | }
intMultMonoid: Monoid[MultInt] = $anon$1@14175c26
```

Now we no longer have ambiguous instances

```scala
scala> implicitly[Monoid[SumInt]]
res2: Monoid[SumInt] = $anon$1@2668fd1

scala> implicitly[Monoid[MultInt]]
res3: Monoid[MultInt] = $anon$1@14175c26
```

Awesome!

How do we define our functions? Well, we need a bit of boilerplate to express our new types. Specifically, we need to tell the compiler that we have a tagged type and what it's composed of.

We do this with `tag[OurTraitThing][TheMasterType](OurValue)`. To encode `1` as a `SumInt` we would do this as `tag[Sum][Int](1)`. This is quite boilerplatey, but that's the price you have to pay for this feature.

Now our monoids look like this:

```scala
scala> import shapeless.tag._
import shapeless.tag._

scala> implicit val intSumMonoid = new Monoid[SumInt] {
     |   def zero: SumInt = tag[Sum][Int](0)
     |   def combine(a: SumInt, b: SumInt): SumInt = tag[Sum][Int](a + b)
     | }
intSumMonoid: Monoid[SumInt] = $anon$1@67846355

scala> implicit val intMultMonoid = new Monoid[MultInt] {
     |   def zero: MultInt = tag[Mult][Int](1)
     |   def combine(a: MultInt, b: MultInt): MultInt = tag[Mult][Int](a * b)
     | }
intMultMonoid: Monoid[MultInt] = $anon$1@5c8940bf
```

Let's test the `foldMonoidList` function we defined earlier works with this:

```scala
scala> val ls: List[Int] = List(1, 2, 3, 4)
ls: List[Int] = List(1, 2, 3, 4)

scala> val ss: List[SumInt] = ls.map(tag[Sum][Int](_))
ss: List[SumInt] = List(1, 2, 3, 4)

scala> val ms: List[MultInt] = ls.map(tag[Mult][Int](_))
ms: List[MultInt] = List(1, 2, 3, 4)
```

and

```scala
scala> foldMonoidList(ss)
res4: SumInt = 10

scala> foldMonoidList(ms)
res5: MultInt = 24
```

Awesomey!

Taking a step back, what we have done here is very simple. We discovered our `Int` type had two distinct meanings, so we created new types so we can reason about that in a meaningful way. The rest is really just shapless magic and boilerplate.
