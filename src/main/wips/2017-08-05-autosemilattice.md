---
layout: post
title:  "AutoSemilattice"
date:   2017-08-05 08:00:00 +0100
categories: semilattices
---

In [my last post](http://hamishdickson.github.io/semilattices/2017/07/12/semilattice-proof.html) I did a small, formal-ish proof that if you had a case class of semilattices, you could build a semilattice. This is building on that using shapeless and some law checking.

## TL; DR

The take away from my last post is that a semilattice is a thing with a (closed) combine function which is idempotent, associative and commutitive. If you have a case class where all the arguments have semilattices, then so does the case class.

Lets built some code that lets you use this.

## Proof by induction

