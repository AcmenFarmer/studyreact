/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ReactVersion from 'shared/ReactVersion';
import {
  REACT_CONCURRENT_MODE_TYPE,
  REACT_FRAGMENT_TYPE,
  REACT_PROFILER_TYPE,
  REACT_STRICT_MODE_TYPE,
  REACT_SUSPENSE_TYPE,
} from 'shared/ReactSymbols';
/*
* Fragment： REACT_FRAGMENT_TYPE  是一个Symbol 我们在书写<React.Fragment>11<React.Fragment/> 其实可以简写成<>11</>
* 作用：因为react渲染的是单个节点或者是一个数组 所以每次在return返回多个节点的时候 不想写一个div  所以可以使用Fragment来包裹一下 这个节点没有任何意义 也不会生成新的节点
* 如果写成数组的话 需要把每个兄弟节点添加key
*
* StrictMode： REACT_STRICT_MODE_TYPE ，对其子节点会做到对一些将要废弃的api进行提醒
*
*
* */
// 1,suspense 只是一个symbol，只是一个标志 但是lazy就不是一个symbol了
// 2,ConcurrentMode（REACT_CONCURRENT_MODE_TYPE）只是一个symbol，只是一个标志

import {Component, PureComponent} from './ReactBaseClasses';
import {createRef} from './ReactCreateRef';
import {forEach, map, count, toArray, only} from './ReactChildren';
import {
  createElement,
  createFactory,
  cloneElement,
  isValidElement,
} from './ReactElement';
import {createContext} from './ReactContext';
import {lazy} from './ReactLazy';
import forwardRef from './forwardRef';
import memo from './memo';
import {
  createElementWithValidation,
  createFactoryWithValidation,
  cloneElementWithValidation,
} from './ReactElementValidator';
import ReactSharedInternals from './ReactSharedInternals';
import {enableStableConcurrentModeAPIs} from 'shared/ReactFeatureFlags';
// 这里是所有react暴露出来的api 2019/1/22 现在真正了解的没有几个  参考电子书学习:https://react.jokcy.me/ todo
const React = {
  Children: { // 这个对象提供了一堆帮你处理props.children的方法，因为children是一个类似数组但是不是数组的数据结构，如果你要对其进行处理可以用React.Children外挂的方法,使用的比较少
    map,// 比较难 map和forEach差不多一样，map是返回新数组，forEach返回原数组
    forEach,
    count,// 子节点的数量
    toArray,// 将子节点转换成数组
    only,// 是否只有一个子节点
  },
  createRef,// 新的ref用法，React即将抛弃<div ref="myDiv" />这种string ref的用法，将来你只能使用两种方式来使用ref
  Component, // 检查组件是否需要更新
  PureComponent,// 检查组件是否需要更新

  createContext, // 改变组件内容的  可以参看例子
  forwardRef, // forwardRef是用来解决HOC组件传递ref的问题的
  lazy, // 可以用来做异步的
  memo, // 和purComponent功能差不多  减少不必要的页面更新

  Fragment: REACT_FRAGMENT_TYPE,// render多个兄弟几点 包括这些兄弟几点时候可以使用这个  不用写一个div包裹了
  StrictMode: REACT_STRICT_MODE_TYPE, // 提示哪些是将要废弃的api
  Suspense: REACT_SUSPENSE_TYPE,// todo
  /*
  * ReactElement通过createElement创建，调用该方法需要传入三个参数：
  type 类型字符串或者变量
  config 组件或者标签的属性 class,id,data-id，等等
  children 内容 或者是子集 可以去babel上面子集试试就知道了
  * */
  createElement: __DEV__ ? createElementWithValidation : createElement, // 创建 ReactElement
  cloneElement: __DEV__ ? cloneElementWithValidation : cloneElement, // 克隆ReactElement
  createFactory: __DEV__ ? createFactoryWithValidation : createFactory, // 创建ReactElement工厂 是对ReactElement的封装
  isValidElement: isValidElement, // 是否是一个ReactElement

  version: ReactVersion,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals,
};

if (enableStableConcurrentModeAPIs) {
  React.ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
  React.Profiler = REACT_PROFILER_TYPE;
} else {
  React.unstable_ConcurrentMode = REACT_CONCURRENT_MODE_TYPE; // ConcurrentMode的引入部分
  React.unstable_Profiler = REACT_PROFILER_TYPE;
}

export default React;
