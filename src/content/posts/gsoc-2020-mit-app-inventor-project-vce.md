---
title: 'GSoC 2020 MIT App Inventor Project VCE'
excerpt: 'My experience working with MIT App Inventor team during GSoC 2020'
publishDate: '2020-08-28'
tags: ['GSoC', 'MIT', 'App Inventor', 'Project', 'VCE', 'Open Source']
quickLinks:
  - title: GSoC Project Page
    link: #todo
  - title: Project Proposal
    link: #todo
  - title: Design Document
    link: #todo
  - title: Documentation
    link: #todo
  - title: Community Feedback
    link: #todo
---

## About the Project
Extensions in App inventor are currently limited to just non-visible components. Due to this, extensions can't be dragged into the mock form designer. To work around this, extension developers have to get a reference to a visible component as parent under which they create UI views. This, however, defeats the idea of App Inventor, which allows the users to create their UI of their apps using the concept of WYSIWYG.

My proposal to solve this problem is to create a generic `MockVisibleExtension`, a subclass of `MockComponent`, which can be dragged into the designer. The extension will have (almost) all the capabilities of a visible component. Further, this allows the extension to be placed under a container component under which the extension can create its views. Thus, this allows the users to view a clear hierarchy of their app's UI when using "visible" extensions.

A ***V**isible **C**omponent **E**xtension* (or VCE) is a type of extension which is able to provide Mock preview of what a component running on a real device would like. It leverages the existing mechanism set in place to write Mocks for the internal components. ***The goal of this project is to make VCE look and feel similar to a regular visible component, and provide a safe and secure way of getting a VCE running in the browser.***

## Background

### About Me
My name is [Pavitra Golchha](https://pavi2410.me). I'm a CSE student. I live in India. I'm passionate about computers and programming. I love my weapons - Kotlin, JavaScript, Python. I like to play badminton, listen to music and learn new stuffs.

### About MIT App Inventor
![App Inventor logo](/assets/blog/MIT-App-Inventor-logo.png)
[App Inventor](https://appinventor.mit.edu) is a web-based no-code Android app maker. It allows anyone to create an app without any prior coding knowledge. It features a drag-and-drop UI designer, and a Blocks editor. It is mostly a learning tool that introduces one to computer science and programming concepts using its blocks model, based on [Blockly](https://developers.google.com/blockly/). It empowers students to turn their ideas into reality as it did for me :)

### My Experience with MIT App Inventor Open Source Project
I am an App Inventor user since 2015, an extension dev and an open source contributor. I was already involved with this organisation which has helped me in a lot of ways - I knew the people in the team, know how the project and most of the code works. I am thankful to them for accepting my proposal.

### My Mentors
[Susan](https://github.com/SusanRatiLane) and [Evan](https://github.com/ewpatton) helped me a lot. They are very knowledgeable, friendly and supportive. They helped me with every big and small problems I faced. I am very fortunate to have them as my mentors.

### My Exterience with Google Summer of Code 2020
![GSoC logo](/assets/blog/GSoC-logo.png)
The 3-month long journey has suddenly felt short :( I enjoyed working for the organisation of my choice. I am very grateful to have this opportunity.

## My Contributions

### Prototype I
  - [PR #2223 @ mit-cml/appinventor-sources](https://github.com/mit-cml/appinventor-sources/pull/2223)
    - Added `isContainer`, `hasCustomMock` properties to @DesignerComponent
    - Added the ability to load Mock scripts for external components
    - Added the ability to instantiate Mocks from a JS file
    - Added a fallback implementation for external components which do not provide a custom Mock
    - Added a registry to hold Mock component factories
    - Added a MockScriptsManager which is responsible for loading, unloading of Mocks
  
### Prototype II
  - [Branch with the new iFrame-based sandbox implementation](https://github.com/pavi2410/appinventor-sources/tree/mvce3)
    - First commit: [Added BuildTools](https://github.com/mit-cml/appinventor-sources/commit/61541e0c5a41f693005369a1a74f404e5aef0c02)
    - Last commit: [JUST MADE THIS WORK UP AND RUNNING](https://github.com/mit-cml/appinventor-sources/commit/30a3e1b2a0dbe7ecc5544d90fc07d42e2bcb1b91)
  - [iFrame-based VCE SDK](https://gist.github.com/pavi2410/18195e3e6096aa257aa0341524d0da9e)
  
### Apart from the scope of this project, I made these little contributions
  - [PR #2275 : URL encode faultData in bug report](https://github.com/mit-cml/appinventor-sources/pull/2275)
  - [PR #2263 : Exclude markdown files from AndroidRuntime.jar](https://github.com/mit-cml/appinventor-sources/pull/2263)
  - [PR #2252 : Make OdeLog to print to brower console also](https://github.com/mit-cml/appinventor-sources/pull/2252)

## Sample Extensions I Made for Testing
- ### [SimpleLabel](https://github.com/pavi2410/vce-samples/tree/simplelabel)
  A simple extension that mimicks the built-in Label component

  #### Mock code
    ```javascript
    class MockSimpleLabel extends MockVisibleExtension {
      static TYPE = "com.pavi2410.SimpleLabel"

      constructor(uuid) {
        super(MockSimpleLabel.TYPE, uuid)
        this.label = document.createElement('span')
        this.initComponent(this.label)
      }

      onCreateFromPalette() {
        this.changeProperty("Text", this.getName() || "NA");
      }

      onPropertyChange(propertyName, newValue) {
        switch (propertyName) {
          case 'Text': {
            this.el.innerText = newValue
            break
          }
        }

        super.onPropertyChange(propertyName, newValue)
      }
    }

    MockComponentRegistry.register(MockSimpleLabel.TYPE, MockSimpleLabel)
    ```
  #### Demo
  ![Working of SimpleLabel VCE](/assets/blog/SimpleLabel_demo.png)
    
- ### [Cowsay](https://github.com/pavi2410/vce-samples/tree/cowsay)
  An extension that displays text said by cow; uses script element-based implementation
  #### Mock code
    ```javascript
    class MockCowsay extends MockVisibleExtension {
      static TYPE = "Cowsay"

      constructor(editor) {
        super(editor, MockCowsay.TYPE)

        this.label = document.createElement("pre")

        this.initComponent(this.label)
      }

      onCreateFromPalette() {
        this.changeProperty("Say", "Moo")
      }

      onPropertyChange(propertyName, newValue) {
        super.onPropertyChange(propertyName, newValue)

        switch (propertyName) {
          case "Say":
            this.label.innerText = cowsay(newValue)
            break
        }
      }

      static create(editor) {
        return new MockCowsay(editor)
      }
    }

    MockComponentRegistry.register(MockCowsay.TYPE, MockCowsay.create)
    ```
  #### Demo
  ![Working of Cowsay VCE](/assets/blog/Cowsay_demo.png)
    
## Implementation

### Prototype I: Script element-based
Initially, I had no idea how could I securely load Mocks. But, eventually, I and my mentors decided to leave that part of the project for the later time, and focus on other things. I worked on creating a `MockScriptsManager` (MSM) which is the heart of this project. This class had the responsibility to init and destroy itself when a project loads or is closed, and load, unload, upgrade Mock components. When a VCE is imported, MSM loads its respective `Mock<component name>.js` and injects a script element with Mock code inside it. When the code inside the script element runs, a Mock calls `MockComponentRegistry` (MCR) to register the Mock class factory along with its type name. On component instantiation, the MockComponent is created using the Mock class factory which is retrieved from the MCR. This worked pretty well leaving the security aspect of this approach.

### Prototype II: iFrame-based sandbox
The goal of the project is to develop a mechanism to load untrusted JS code from third-party extensions in a secure manner. I knew that the script-element based implementation is not all safe option to go with in the production. I researched a lot on creation of a safe environment to execute JS code, and came across various projects like [Google Caja](https://developers.google.com/caja/), [remote-dom](https://github.com/wix/remote-dom), [jsdom](https://github.com/jsdom/jsdom), Web Workers, [Realms](https://github.com/Agoric/realms-shim), etc. It was known from the beginning that we could iFrames to securely isolate untrusted code, but I didn't know how the implementation would go. But, after the second month, I finally decided to work with iFrames. Most of the code was reused from Prototype I. I developed an asynchronous messaging system which makes communication between iFrames and the top window (where the App Inventor client runs) possible.

> Message protocol used for communication between iFrames and the GWT client
> ```json
> {
>   "action": "string",
>   "args": [ "args to accompany the action" ],
>   "type": "component type",
>   "uuid": "uuid of each instance"
> }
> ```

![iFrame sequence diagram](/assets/blog/iFrameImpl_SeqDiagram.png)

I wanted to reuse the existing Mock API for this as well, so I created a VCE SDK which uses the async messaging system under the hood. The VCE SDK resides on the server-side, so it can be easily updated and maintained.

When this worked, it made my day 🥳🎉 I was full of joy that day 😁 I couldn't believe myself that this magically worked!

## Technical Challenges
- Creating JavaScript sandbox to securely evaluate third-party extensions' Mock
  
  This was the greatest challenge of this project. I had no clue how to solve that. Upon research, I found a handful of solutions that others have developed to mitigate the same technical difficulty. But some or the other had issues of their own. So, we finally decided to build a iFrame-based sandbox system which uses browser window messages communication to allow us to talk to iFrame and let third-party Mock authors securely serve and run their Mock previews.

- Getting the GWT client to work with dynamically loaded external JavaScript code

## Future Work
- Can't create more than one instance of a VCE
- Reloading the page causes a runtime error, making VCE implementation useless
- Implement callback messaging system with iframe
- Support version upgrades
- Mock Container support
- More and more rigorous testing.

## Conclusion
I would say that this summer and the lockdown due to COVID-19 in my country was well spent. I enjoyed my time working on this project. I would continue to work on this project after the GSoC program ends as the project is still not complete. I learned many things along my way. The weekly meetings we did with other participants and mentors in the org was an amazing opportunity for me to showcase my work to others, talk and discuss problems with my mentors.
