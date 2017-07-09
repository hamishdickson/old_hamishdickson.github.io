name := "hamishdickson.github.io"

version := "1.0"

scalaVersion := "2.12.2"

libraryDependencies ++= Seq(
  "com.chuusai" %% "shapeless" % "2.3.2",
  "org.typelevel" %% "cats" % "0.8.1"
)

enablePlugins(TutPlugin)


tutSourceDirectory := baseDirectory.value / "src/main/tut"

tutTargetDirectory := baseDirectory.value / "_posts"
