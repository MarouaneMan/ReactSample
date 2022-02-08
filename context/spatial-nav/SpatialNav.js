class SpatialNav {

    constructor(options)
    {
        this.tree     = [];
        this.options  = options || {};
        this.needSort = true;

        this.previousFocusEl = null;
        this.currentFocusEl  = null;
    }

    focusImpl(node)
    {
        if (this.currentFocusEl)
            this.previousFocusEl = this.currentFocusEl;

        this.currentFocusEl = node;

        node.focus({});
        //node.focus({preventScroll: true}); still new
    }

    getPreviousFocusEl()
    {
        return this.previousFocusEl;
    }

    findFocus()
    {
        const node = this.findNode(document.activeElement);
        if (!node && this.tree.length > 0)
        {
            if (this.tree[0].children.length === 0)
                this.focusImpl(this.tree[0].domEl);
            else
                this.focusSection(this.tree[0]);
            return null;
        }
        return node;
    }

    moveLeft()
    {
        const focus = this.findFocus();
        if (focus)
        {
            if (focus.disableMove.left)
                return;

            if (focus.overrideMove.left)
            {
                if (!focus.overrideMove.left())
                    return;
            }

            this.GotoNextElement(focus, {
                direction   : 'left',
                dirCondition: (current, target) => target.x + target.width <= current.x + current.width / 2
            });
        }
    }

    moveRight()
    {
        const focus = this.findFocus();
        if (focus)
        {
            if (focus.disableMove.right)
                return;

            if (focus.overrideMove.right)
            {
                if (!focus.overrideMove.right())
                    return;
            }

            this.GotoNextElement(focus, {
                direction   : 'right',
                dirCondition: (current, target) => target.x > current.x + current.width / 2
            });
        }
    }

    moveUp()
    {
        const focus = this.findFocus();
        if (focus)
        {
            if (focus.disableMove.up)
                return;

            if (focus.overrideMove.up)
            {
                if (!focus.overrideMove.up())
                    return;
            }

            this.GotoNextElement(focus, {
                direction   : 'up',
                dirCondition: (current, target) => target.y + target.height <= current.y + current.height / 2
            });
        }
    }

    moveDown()
    {
        const focus = this.findFocus();
        if (focus)
        {
            if (focus.disableMove.down)
                return;

            if (focus.overrideMove.down)
            {
                if (!focus.overrideMove.down())
                    return;
            }

            this.GotoNextElement(focus, {
                direction   : 'down',
                dirCondition: (current, target) => target.y >= current.y + current.height / 2,
            });
        }
    }

    GotoNextElement(item, move, originSource)
    {
        if (!item)
            return;
        if (this.options.debug)
        {
            console.log('Tree : ');
            console.log(this.tree);
        }

        // Check direction within parent first
        let candidates = [];
        let neighbours = item.parent ? item.parent.children : this.tree;
        neighbours.forEach((neighbour) => {
            if (neighbour !== item && neighbour.rect.width > 0)
            {
                if (move.dirCondition(originSource || item.rect, neighbour.rect) && neighbour.enabled)
                {
                    candidates.push({
                        item    : neighbour,
                        distance: SpatialNav.calcDistance(
                            originSource || item.rect,
                            neighbour.rect,
                            move.direction
                        ),
                    });
                }
            }
        });

        // Sort candidates by distance
        candidates.sort((a, b) => {
            if (a.distance < b.distance) return -1;
            else if (a.distance > b.distance) return 1;
            return 0;
        });

        if (this.options.debug)
        {
            console.log('Candidates : ');
            console.log(candidates);
        }

        // Focus first candidate if any
        if (candidates.length > 0)
        {
            let selectedCandidate = candidates[0];
            if (this.options.debug)
            {
                console.log('Selected candidate :');
                console.log(selectedCandidate);
            }
            if (selectedCandidate.item.children.length > 0)
            {
                // Focus top left selected candidate's child
                this.focusSection(selectedCandidate.item);
            }
            else
            {
                // Focus selected element
                this.focusImpl(selectedCandidate.item.domEl);
                if (selectedCandidate.item.parent)
                    selectedCandidate.item.parent.lastFocused = selectedCandidate.item;
            }
            return;
        }

        // No candidate was found, try to migrate to another panel
        if (item.parent)
            this.GotoNextElement(item.parent, move, item.rect);
    }

    focusSection(section)
    {
        if (section.enterTo === 'default-element' && section.defaultChild)
        {
            if (section.defaultChild.children.length > 0)
                this.focusSection(section.defaultChild);
            else
                this.focusImpl(section.defaultChild.domEl);
            return;
        }

        if (section.enterTo === 'last-focused' && section.lastFocused)
        {
            if (section.lastFocused.children.length > 0)
                this.focusSection(section.lastFocused);
            else
                this.focusImpl(section.lastFocused.domEl);
            return;
        }

        // Default top-left
        // Find closest focusable element to top left corner
        if (this.needSort)
        {
            section.children.sort((a, b) => {

                // Dirty fix for display:none
                if (a.rect.width === 0) return 1;
                if (b.rect.width === 0) return -1;

                if (a.origin_distance < b.origin_distance) return -1;
                else if (a.origin_distance > b.origin_distance) return 1;
                return 0;
            });

            this.needSort = false;
        }

        if (section.children.length > 0)
        {
            if (this.options.debug)
            {
                console.log('FocusTopLeftItem tree:');
                console.log(section.children);
            }
            let focusableItem = ((node) => {
                while (node.children.length > 0)
                    node = node.children[0];
                return node;
            })(section.children[0]);
            this.focusImpl(focusableItem.domEl);
            section.lastFocused = focusableItem;
        }
    }

    addFocusable({target, parent, enterTo, overrideMove, disableMove, animatable, defaultChildDomEl})
    {
        if (this.options.debug_draw && parent)
            target.style.boxShadow = '0 0 0 1px green';
        else if (this.options.debug_draw)
            target.style.boxShadow = '0 0 0 1px red';
        this.needSort = true;

        // Check if target already exist
        const node = this.findNode(target);
        if (node)
        {
            if (parent)
            {
                // Find parent or create it
                node.parent = this.findNode(parent);
                if (!node.parent)
                    this.tree.push(node.parent = this.newChild(parent, null));

                // Append child
                node.parent.children.push(node);

                // Remove node from root
                this.tree = this.tree.filter(e => e !== node);
            }
            node.enterTo      = enterTo;
            node.overrideMove = overrideMove;
            node.disableMove  = disableMove;
            node.animatable   = animatable;
            node.defaultChild = this.findNode(defaultChildDomEl);
        }
        else
        {
            let p              = null;
            let child          = this.newChild(target, null);
            child.enterTo      = enterTo;
            child.overrideMove = overrideMove;
            child.disableMove  = disableMove;
            child.animatable   = animatable;
            child.defaultChild = this.findNode(defaultChildDomEl);
            if (parent)
            {
                // Find parent or create it
                p = this.findNode(parent);
                if (!p)
                    this.tree.push(p = this.newChild(parent, null));
                p.children.push(child);
                child.parent = p;
            }
            else
                this.tree.push(child); // Append to tree
        }
    }

    makeFocusable(target)
    {
        if (!target.hasAttribute('tabindex'))
            target.setAttribute('tabindex', -1);
    }

    removeFocusable({target, parent})
    {
        this.needSort = true;

        if (!parent)
        {
            this.tree = this.tree.filter(e => e.domEl !== target);
            return;
        }

        this.findNode(parent, p => {
            p.children = p.children.filter(child => child.domEl !== target);
        });
    }

    setSectionDefaultNode(domEl, defaultNode)
    {
        const node = this.findNode(domEl);
        if (node)
            node.defaultChild = this.findNode(defaultNode);
    }

    setFocus(domEl)
    {
        const node = this.findNode(domEl);
        if (node.children.length > 0)
            this.focusSection(node);
        else
            this.focusImpl(domEl);
    }

    setEnabled(domEl, state, parentState)
    {
        this.findNode(domEl, e => {
            e.enabled = state;
            if (e.parent && (parentState === false || parentState === true))
                e.parent.enabled = parentState;
        });
    }

    refreshTreeRects({forceRefresh})
    {
        this.treeTraversal(this.tree, e => {
            if (forceRefresh || (!e.animatable && !e.parent?.animatable))
            {
                e.rect            = SpatialNav.getRect(e.domEl);
                e.origin_distance = SpatialNav.calcDistance({
                    x     : 0,
                    y     : 0,
                    width : e.rect.width,
                    height: e.rect.height
                }, e.rect);
            }
        });
    }

    findNode(domEl, callback)
    {
        let node = null;
        this.treeTraversal(this.tree, e => {
            if (e.domEl === domEl)
            {
                node = e;
                if (callback)
                    callback(e);
                return true;
            }
        });
        return node;
    }

    treeTraversal(tree, callback)
    {
        tree.forEach((node) => {
            if (callback(node) !== true)
                if (node.children.length > 0)
                    this.treeTraversal(node.children, callback);
        });
    }

    newChild(domEl, parent)
    {
        const rect = SpatialNav.getRect(domEl);
        return {
            domEl          : domEl,
            parent         : parent,
            children       : [],
            rect           : rect,
            lastFocused    : null,
            enabled        : true,
            enterTo        : 'top-left',
            defaultChild   : null,
            overrideMove   : {},
            disableMove    : {},
            animatable     : false,
            origin_distance: SpatialNav.calcDistance({
                x     : 0,
                y     : 0,
                width : rect.width,
                height: rect.height
            }, rect)
        };
    }

    static calcDistance(src, dst, direction)
    {
        let dx, dy;
        switch (direction)
        {
            case 'left':
                //   Dest                       Source
                // ***********               ************
                // *         *    Distance   *          *
                // *         *x--------------*----x     *
                // *         *               *          *
                // ***********               ************
                dx = (src.x + src.width / 2) - (dst.x + dst.width);
                dy = (src.y + src.height / 2) - (dst.y + dst.height / 2);
                break;

            case 'right':
                //   Source                      Dest
                // ***********               ************
                // *         *    Distance   *          *
                // *    x----*--------------x*          *
                // *         *               *          *
                // ***********               ************
                dx = (src.x + src.width / 2) - dst.x;
                dy = (src.y + src.height / 2) - (dst.y + dst.height / 2);
                break;

            case 'up':
                // ***********
                // *         *
                // *         * Dest
                // *         *
                // *****x*****
                //      |
                //      |Distance
                //      |
                // *****|*****
                // *    |    *
                // *    x    * Source
                // *         *
                // ***********
                dx = (src.x + src.width / 2) - (dst.x + dst.width / 2);
                dy = (src.y + src.height / 2) - (dst.y + dst.height);
                break;

            case 'down':

                // ***********
                // *         *
                // *    x    * Source
                // *    |    *
                // *****|*****
                //      |
                //      |Distance
                //      |
                // *****x*****
                // *         *
                // *         * Dest
                // *         *
                // ***********
                dx = (src.x + src.width / 2) - (dst.x + dst.width / 2);
                dy = (src.y + src.height / 2) - dst.y;
                break;

            default:
                //   Source                   Destination
                // ***********               ************
                // *         *    Distance   *          *
                // *    x----*---------------*----x     *
                // *         *               *          *
                // ***********               ************
                dx = (src.x + src.width / 2) - (dst.x + dst.width / 2);
                dy = (src.y + src.height / 2) - (dst.y + dst.height / 2);
        }
        return Math.sqrt(dx * dx + dy * dy);
    }

    static getRect(el)
    {
        if (!el)
        {
            return {
                x: 0, y: 0, width: 0, height: 0
            };
        }

        let rect       = el.getBoundingClientRect(),
            scrollLeft =
                window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop  =
                window.pageYOffset || document.documentElement.scrollTop;
        return {
            x     : Math.ceil(rect.left + scrollLeft),
            y     : Math.ceil(rect.top + scrollTop),
            width : el.offsetWidth,
            height: el.offsetHeight,
        };
    }
}

export default SpatialNav;
