import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  LAYOUT_VERTICAL, LAYOUT_HORIZONTAL, LAYOUT_MODE, LAYOUT_WIDTH,
  LAYOUT_POSITION, SIDEBAR_SIZE, SIDEBAR_COLOR, TOPBAR
} from './main.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

/**
 * Lauout Component
 */
export class MainComponents implements OnInit, AfterViewInit {

  // layout related config
  layoutType!: string;
  layoutMode!: string;
  layoutwidth!: string;
  layoutposition!: string;
  topbar!: string;
  sidebarcolor!: string;
  sidebarsize!: string;

  constructor() { }

  ngOnInit() {

    this.layoutMode = LAYOUT_MODE;
    // default settings
    this.layoutType = LAYOUT_VERTICAL;
    this.layoutwidth = LAYOUT_WIDTH;
    this.layoutposition = LAYOUT_POSITION;
    this.sidebarcolor = SIDEBAR_COLOR;
    this.sidebarsize = SIDEBAR_SIZE;
    this.topbar = TOPBAR;

    this.LayoutMode(this.layoutMode);
    this.LayoutWidth(this.layoutwidth);
    this.LayoutPosition(this.layoutposition);
    this.Topbar(this.topbar);
    this.SidebarColor(this.sidebarcolor);
    this.SidebarSize(this.sidebarsize);

    // listen to event and change the layout, theme, etc

  }

  ngAfterViewInit() {
  }

  /**
   * Check if the vertical layout is requested
   */
  isVerticalLayoutRequested() {
    return this.layoutType === LAYOUT_VERTICAL;
  }

  /**
   * Check if the horizontal layout is requested
   */
  isHorizontalLayoutRequested() {
    return this.layoutType === LAYOUT_HORIZONTAL;
  }

  LayoutMode(mode: string) {
    if (mode === 'light') {
      document.body.setAttribute("data-layout-mode", "light");
      document.body.setAttribute("data-topbar", "light");
    } else if (mode === 'dark') {
      document.body.setAttribute("data-sidebar", "dark");
      document.body.setAttribute("data-layout-mode", "dark");
      document.body.setAttribute("data-topbar", "dark");
    } else {
      document.body.setAttribute("data-layout-mode", "light");
      document.body.setAttribute("data-topbar", "light");
    }
  }

  LayoutWidth(width: string) {
    if (width === 'fluid') {
      document.body.setAttribute("data-layout-size", "fluid");
    }
    else {
      document.body.setAttribute("data-layout-size", "boxed");
    }
  }

  LayoutPosition(position: string) {
    if (position === 'fixed') {
      document.body.setAttribute("data-layout-scrollable", "false");
    } else {
      document.body.setAttribute("data-layout-scrollable", "true");
    }
  }

  SidebarColor(color: string) {
    switch (color) {
      case 'light':
        document.body.setAttribute('data-sidebar', 'light');
        break;
      case 'dark':
        document.body.setAttribute('data-sidebar', 'dark');
        break;
      case 'brand':
        document.body.setAttribute('data-sidebar', 'brand');
        break;
      default:
        document.body.setAttribute('data-sidebar', 'dark');
        break;
    }
  }

  Topbar(topbar: string) {
    if (topbar === 'light') {
      document.body.setAttribute("data-topbar", "light");
    } else if (topbar === 'dark') {
      document.body.setAttribute("data-topbar", "dark");
    } else {
      document.body.setAttribute("data-topbar", "dark");
    }
  }

  SidebarSize(size: string) {
    if (size === 'default') {
      document.body.setAttribute('data-sidebar-size', 'lg');
    } else if (size === 'compact') {
      document.body.setAttribute("data-sidebar-size", "md");
    } else if (size === 'small') {
      document.body.setAttribute("data-sidebar-size", "sm");
    } else {
      document.body.setAttribute('data-sidebar-size', 'lg');
    }
  }
}
