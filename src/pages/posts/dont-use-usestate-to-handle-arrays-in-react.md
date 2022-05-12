---
layout: '@/layouts/BlogLayout.astro'
title: "Don't use useState to handle arrays in React"
excerpt: 'Improve readabilty of your React components by not using useState to handle arrays.'
publishDate: '2022-02-17'
tags: ['react', 'hooks', 'array', 'frontend']
---

## Problem 😣

To keep a state of primitive values, React's built-in `useState` hook is ideal. But, for arrays and objects?... It is quite not intuitive nor effective. 

## Cause ⁉️

The skills required to use spread operator `...` to manipulate an array is out of the world. Spread operator is also known to be a key thing that slow things down. It has an `O(n)` runtime performance which gets hidden behind a cute syntax. But, when it is used too much in ways it was not designed to be used, things gets really messy and it hurts readabilty.

```jsx
function Old() {
  const [items, setItems] = useState([])

  function push() {
    setItems([...items, `${items.length}`])
  }

  function pop() {
    items.pop()
    setItems([...items])
  }

  function pushLeft() {
    setItems([randomValue(), ...items])
  }

  function popLeft() {
    const [v, ...el] = items
    setItems(el)
  }

  function insert() {
    items.splice(randomIndex(items), 0, randomValue())
    setItems([...items])
  }

  function update() {
    items[randomIndex(items)] = randomValue()
    setItems([...items])
  }

  function remove() {
    items.splice(randomIndex(items), 1)
    setItems([...items])
  }

  function clear() {
    setItems([])
  }

  return (
    <div className="space-y-4">
      <h1><b>Old Way</b></h1>
      <div className="flex flex-row flex-wrap gap-2">
        <Button onClick={push}>Push</Button>
        <Button onClick={pop}>Pop</Button>
        <Button onClick={pushLeft}>Push Left</Button>
        <Button onClick={popLeft}>Pop Left</Button>
        <Button onClick={insert}>Insert</Button>
        <Button onClick={update}>Update</Button>
        <Button onClick={remove}>Remove</Button>
        <Button onClick={clear}>Clear</Button>
      </div>
      <div className="flex flex-row gap-2 bg-slate-200 p-2 h-12">
        {items.map((item, i) => (
          <Item key={i}>{item}</Item>
        ))}
      </div>
    </div>
  )
}
```

A common pattern we can notice here is that the array is first manipulated and then, to cause a re-render, the array is cloned before setting the state. However, this can lead to big performance issue as cloning an array is not cheap, especially when it contains larger objects in larger quantity.

## Solution 💡

I came up with an idea of writing my own hook to handle arrays efficiently. This is inspired by Jetpack Compose's `val myList = remember { mutableStateListOf<T>() }` (thing!). We can easily manipulate the list like how we do in an imperative fashion. This will trigger recompositions whenever an item is updated, added or removed.

Here's an example of what I mean

```kotlin
@Composable
fun SomeComponent() {
  val list = remember { mutableStateListOf<Int>() }

  LaunchedEffect(Unit) {
    // manipulate list here
    list.add(123)
  }

  // just use the list interface anywhere
  list.forEach { item ->
    Text(item)
  }
}
```

Without further ado, let's jump right into the code which I implemented.

```jsx
export function useArrayState(initial = []) {
  const array = useMemo(() => initial, [])
  const [refresh, setRefresh] = useState(0)
  const cb = useCallback((f) => {
    f(array)
    setRefresh(it => ++it)
  }, [])

  return [array, cb]
}
```

This hook allows us to rewrite the `<Old>` component like so:
```jsx
function New() {
  const [items, updateItems] = useArrayState([56, 98, 36])

  function push() {
    updateItems(it => it.push(it.length))
  }

  function pop() {
    updateItems(it => it.pop())
  }

  function pushLeft() {
    updateItems(it => it.unshift(randomValue()))
  }

  function popLeft() {
    updateItems(it => it.shift())
  }

  function insert() {
    updateItems(it => it.splice(randomIndex(it), 0, randomValue()))
  }

  function update() {
    updateItems(it => it[randomIndex(it)] = randomValue())
  }

  function remove() {
    updateItems(it => it.splice(randomIndex(it), 1))
  }

  function clear() {
    updateItems(it => it.length = 0)
  }

  return (
    <div className="space-y-4">
      <h1><b>New Way</b></h1>
      <div className="flex flex-row flex-wrap gap-2">
        <Button onClick={push}>Push</Button>
        <Button onClick={pop}>Pop</Button>
        <Button onClick={pushLeft}>Push Left</Button>
        <Button onClick={popLeft}>Pop Left</Button>
        <Button onClick={insert}>Insert</Button>
        <Button onClick={update}>Update</Button>
        <Button onClick={remove}>Remove</Button>
        <Button onClick={clear}>Clear</Button>
      </div>
      <div className="flex flex-row gap-2 bg-slate-200 p-2 h-12">
        {items.map((item, i) => (
          <Item key={i}>{item}</Item>
        ))}
      </div>
    </div>
  )
}
```

Try it out here: https://replit.com/@pavi2410/React-useArrayState

## Similar hooks

This hook is from https://mantine.dev which I didn't know about until midway of writing this 🥲. If I knew already, you wouldn't be here reading this. Anyway, here it is: https://mantine.dev/hooks/use-list-state/

## Final Words

Declarative UI pattern in blooming and changing how we design and develop UIs. It feels great in every way. All we need is to use these cool stuffs responsively and efficiently such that it doesn't affect readability, performance and hurt peoples' brains.

## Comments? Feedback?

I'd love to hear you -> [Blog: Don't use `useState` to handle arrays in React](https://github.com/pavi2410/website/issues/5)
