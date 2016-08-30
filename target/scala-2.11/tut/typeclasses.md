# Type classes for the "OOP" dev

One of the central ideas in modern programming is polymorphism.

In languages like Java and PHP, polymorphism is achieved by extending a class/interface and overriding methods (this is called subclass-polymorphism). In my experience most developers from those languages aren't aware that this is just one of a few ways to achieve polymorphism. What makes it really weird is the fact that where other approaches are possible, subclass-polymorphism is frowned upon.

In this post I'm going to talk about an approach called _Type Classes_ (or ad-hoc polymorphism), which is more powerful than subclass-polymorphism and doesn't have some of the drawbacks.

Type classes are a general idea that can be used in any language with a modern type system, I'm going to show you Scala's implementation which differs slightly from Haskell or Idris.

# Polymorphism in Java land

Imagine you had the following java method

```Java
public Integer adder(Integer a1, Integer a2) { ... }
```

and after some time you realised that `adder` also makes sense for Strings, Lists and many other classes. In Java, we would create an interface like this

```Java
interface Adder <T> {
  T adder(T a1, T a2);
}
```

And then extend that in each class where `adder` makes sense.

```Java
public class MyInt implements Adder<Integer> {
  Integer adder(Integer a1, Integer a2) {
    return a1 + a2
  }
}
```



https://pbs.twimg.com/media/Chp1oKVW0AAep_H.jpg:large

say you were working on a piece of code and you found something really general that you wanted to use in lots of different classes. Lets use this

```scala
scala> def adder[T](t1: T, t2: T): T
```

This is great, you realise that your class `Foo` and your other class `Bar` both make sense to use adder

```scala
     | case class Foo(x: Int, y: String)
<console>:12: error: only classes can have declared but undefined members
       def adder[T](t1: T, t2: T): T
           ^
     | case class Bar(a: Double)
<console>:12: error: only classes can have declared but undefined members
       def adder[T](t1: T, t2: T): T
           ^
```

how do we implement this? well let's create a trait that both `Foo` and `Bar` can inherit from

```scala
     | trait Adder[A] {
     |   add(a1: A, a2: A): A
     | }
<console>:12: error: only classes can have declared but undefined members
       def adder[T](t1: T, t2: T): T
           ^
<console>:14: error: not found: value add
         add(a1: A, a2: A): A
         ^
<console>:14: error: not found: value a1
         add(a1: A, a2: A): A
             ^
<console>:14: error: not found: value a2
         add(a1: A, a2: A): A
                    ^
```

`#winning`

After a bit more work, you realise that actually, `adder` also makes sense for `Int`, `Double` and `String`... oh and `List` too - that's a problem since you can't extend any of those!

`#notwinning`

So what can we do?

The answer is type classes.

First off, that `Adder` thing above is a real thing, it's called a SemiGroup - I just want to get that out the way, because it was painful to type.

```scala
     | trait SemiGroup[A] {
     |   add(a1: A, a2: A): A
     | }
```

So how else can we use polymorphism to define this add behavour for our code?

The key is, is to implement the type class and when it's used pass it in


here you’d use a monoid and you’d pass it in as a curry’d arg (actually, a semigroup would be better)

and adder would be

```scala
     | def adder[T](t1: T, t2: T)(implicit M: Monoid[T]): T = M.combine(t1, t2)
```

then somewhere in scope you define what `Monoid[T]` is for your T

```scala
     | implicit def listMonoid[A] = new Monoid[List[A]] {
     |   def combine(a1: List[A], a2: List[A]): List[A] = a1 ++ a2
     |   def zero: List[A] = Nil
     | }
```

then you can do

```scala
     | adder(List(1,2,3), List(4,5,6))
```

you don’t need to pass in the second curry’d arg, that’s in scope and the compiler finds it for you

and if it doesn’t exist, then your program won’t compile

```scala
     |   adder("woozle", "boink")
```

# If this is so good, then why have I never head of it?

There are a couple of possible answers here

## Old people and books

The great thing about books is they can change the way people code. There are a handful which have profoundly shaped the way I think about code. The bad thing is people read them well after they are out of date. The Gang of Four book is a great example. It changed the way people code forever. However, it's so popular that people don't realise there are newer ways to get the same results.


## Your language has an old/no type system

Java has
