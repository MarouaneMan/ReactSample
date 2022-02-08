### SpatialNav

#### useSpatialNavContext functions:

* setFocus(domEl) : focus element or section
* setEnabled(domEL, true|false): Enable / disable navigation to given dom element
* refreshTree({forceRefresh:bool}) : Refresh internal tree, (positions of elements, rects..), use forceRefresh to force refresh animatable components

#### SpatialNavSection attrs:

* enterTo : 'default-element' , 'last-focused', 'top-left'. Default is 'top-left'
* focusOnMount : focus section on mount
* animatable : animatable elements and children rects will not be refreshed by refreshTreeRects()

#### useSpatialNav hook parameters:

* defaultElement : whether the component is the default section element
* focusOnMount : focus component on mount
* overrideMove* : execute given callback, return true to move, false otherwise. e.g :  overrideMoveLeft={() => console.log('Dont move left'); return false},
* disableMove* : disableMoveLeft, Right...
* animatable : animatable elements and children rects will not be refreshed by refreshTreeRects()
