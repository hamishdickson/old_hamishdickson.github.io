---
layout: post
title:  "vals in classes"
date:   2016-12-17 08:00:00 +0100
categories: scalac
---


So I learnt something new this week and even though it's quite obvious when you stand back and look, I thought it would be good to share how I got there.

## A bit of background

I don't have a CS degree, so I've never really studied compliers. To me they have always been magic things that take my hard earned babble and if I've been a good boy turn it into something that I can run.

It turns out that the magic bit is nonsense (ask anyone that knows me, the babble bit is definitely true...) scala's compiler (scalac) is itself written in scala and is actually a sensible piece of code you can read and sometimes even understand.

Side note: if you're sat there trying to work out how scala can be written in scala google "compiler bootstrapping"

## vals in classes

What's the difference between these two classes?

```tut
class A(a: Int)

class B(val b: Int)
```

Well, let's see what the compiler says.

The compiler splits compilation out into phases. Exactly which phases depends on your program, but you can see what they are for a given program if you add the compiler flag `-Xshow-phases`. If I shove our two classes into a file and compile them, we get this

```
$ scalac -Xshow-phases woozle.scala
cat: /release: No such file or directory
   phase name  id  description
   ----------  --  -----------
       parser   1  parse source into ASTs, perform simple desugaring
        namer   2  resolve names, attach symbols to named trees
packageobjects  3  load package objects
        typer   4  the meat and potatoes: type the trees
       patmat   5  translate match expressions
superaccessors  6  add super accessors in traits and nested classes
   extmethods   7  add extension methods for inline classes
      pickler   8  serialize symbol tables
    refchecks   9  reference/override checking, translate nested objects
      uncurry  10  uncurry, translate function values to anonymous classes
       fields  11  synthesize accessors and fields, add bitmaps for lazy vals
    tailcalls  12  replace tail calls by jumps
   specialize  13  @specialized-driven class and method specialization
explicitouter  14  this refs to outer pointers
      erasure  15  erase types, add interfaces for traits
  posterasure  16  clean up erased inline classes
   lambdalift  17  move nested functions to top level
 constructors  18  move field definitions into constructors
      flatten  19  eliminate inner classes
        mixin  20  mixin composition
      cleanup  21  platform-specific cleanups, generate reflective calls
   delambdafy  22  remove lambdas
          jvm  23  generate JVM bytecode
     terminal  24  the last phase during a compilation run
```

Compiler plugins work by adding new custom phases to this list.

You can also print out what the compiler is doing after each phase. You do this by using the `-Xprint:<some phase>` flag, lets try this with the parser:

```
$ scalac -Xprint:parser woozle.scala
cat: /release: No such file or directory
[[syntax trees at end of                    parser]] // woozle.scala
package <empty> {
  class A extends scala.AnyRef {
    <paramaccessor> private[this] val a: Int = _;
    def <init>(a: Int) = {
      super.<init>();
      ()
    }
  };
  class B extends scala.AnyRef {
    <paramaccessor> val b: Int = _;
    def <init>(b: Int) = {
      super.<init>();
      ()
    }
  }
}
```

So what is this telling us? Well, it's saying that

```tut
class A(a: Int)
```

creates a variable inside the class `A`

```scala
private[this] val a: Int
```

This is set during initialisation. Notice that it has the access modifier `private[this]`, meaning it's not accessible outside of this instance of `A`. We would have got the same thing if we had defined `A` as `class A(private[this] val a)`

This doesn't happen in `B`, where `b` is effectively public.

Annoyingly, if you try to create a companion object for `A` and use `a` you get a failure

```tut
class A(a: Int)
```

```tut:fail
object A {
  val y = a
}
```

As someone who never really uses classes in my code this surprised me a bit, but it's completely obvious if you think about it for more than about 5 seconds.

## What about case classes?

Lets make `A` and `B` case classes

```tut
case class A(a: Int)
case class B(val b: Int)
```

here we get

```
$ scalac -Xprint:parser woozle2.scala
cat: /release: No such file or directory
[[syntax trees at end of                    parser]] // woozle2.scala
package <empty> {
 case class A extends scala.Product with scala.Serializable {
   <caseaccessor> <paramaccessor> val a: Int = _;
   def <init>(a: Int) = {
     super.<init>();
     ()
   }
 };
 case class B extends scala.Product with scala.Serializable {
   <caseaccessor> <paramaccessor> val b: Int = _;
   def <init>(b: Int) = {
     super.<init>();
     ()
   }
 }
}
```

As you can see, `a: Int` and `val b: Int` result in the same output and are accessible anywhere.

## Conclusion

Well there isn't one really, I learnt something from playing about with the compiler.

I guess that's as good a conclusion as any: play about, you might learn something.
