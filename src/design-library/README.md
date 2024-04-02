# Working with Storybook

## Development

Run our design library's storybook locally.

```console
  npm run storybook:start
```

## Deployment

Builds and deploys current Storybook app version, http://nmg-book.namogoo.com/

```
  npm run storybook:deploy
```

---

# Add a story

- #### Create a new component in `design-library/src/components` folder.
- #### Create a new .stories file in `design-library/src/stories` folder.
- #### View the [Example Menu Story](/packages/design-library/stories/Menu/Menu.stories.js) to see an example story with argTypes, variants,

---

<br>

# New component basic guidelines

> ##### <div style="color:#FF6666">Prior to starting anything, its a good idea to check if a similar component is already available in the library with similar functionality, if so, discuss with design team on how to approach the new component and what to do with the existing one.</div>

#### Every new component should have a story file when created, this is the place describe everything you can about usage and needs. the story needs to describe best on how to use the component, which props can be used and how they affect the component. For best results include some different variants to the component's story. For example a default menu, and a menu with search input, and other impactful variants you can think of.

<br>

<div style="color:#FF6666">Every new entry <b>MUST</b> be reviewed by a design team member before committed to the design library.</div>
<br>

## Props:

Component props

- #### Keep names as generic and as descriptive as possible.
- #### Derive as much "truth" from every prop within reason, for example instead of having props `shouldShowButton` and `buttonText`, why not use only `buttonText` and derive `shouldShowButton` from it?

---

## Style:

#### Familiarize yourself with `design-library/src/styles` folder, where we keep all our

> - Typography.
> - Colors.
> - functional Mixins (e.g: ellipsis, etc...).
> - dimensions and more.

- #### Always wrap your styles within the container's class to avoid style leaking out to other elements, also make sure that class isn't a generically named (like 'container') and is uniquely specific to its component.
- #### Don't overuse SCSS's nesting capabilities to avoid having selectors that are too specific hence hard to override.
- #### Make sure your colors/dimensions and everything else you can, is taken from our styles folder.
  > Note that you can also import .scss files into your .js and your .vue files.
  > <img src="https://nmg-platform-resources.s3.amazonaws.com/importscss" style="height:130px;" />

---

## Assets:

- For images/icons, always prefer **.svg** file over **.png** or **.jpg**, Figma allows you to choose your asset's file type.

<br>

# Working with Figma

#### Coming soon!
