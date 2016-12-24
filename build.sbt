name := "hamishdickson.github.io"

version := "1.0"

scalaVersion := "2.12.1"

tutSettings

libraryDependencies ++= Seq(
  "com.chuusai" %% "shapeless" % "2.3.2",
  "org.typelevel" %% "cats" % "0.8.1"
)

tutSettings

tutSourceDirectory := baseDirectory.value / "src/main/tut"

tutTargetDirectory := baseDirectory.value / "_posts"
