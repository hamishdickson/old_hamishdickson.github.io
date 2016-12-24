---
layout: post
title:  "Monoid of product of coproducts"
date:   2016-12-17 08:00:00 +0100
categories: fp
---

does anyone know how to fold over two coproducts with a monoid?



```scala
trait Monoid[T] {
  def zero: T
  def combine(a: T, b: T): T
}

// lets create something for nice syntax
implicit class MonoidSyntax[T](x: T)(implicit val M: Monoid[T]) {
  def |+|(y: T): T = M.combine(x, y)
}


```
