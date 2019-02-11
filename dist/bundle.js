/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "2d07ede14217991be55b";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.js","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assets/images/logo.svg":
/*!************************************!*\
  !*** ./src/assets/images/logo.svg ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDYwMCA2MDAiPgogICAgPHBhdGggc3R5bGU9ImZpbGw6ICNmZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMwMCwzMDApIHNjYWxlKDAuMDM4NzUsLTAuMDM4NzUpIiBkPSJNLTczNDQtMTIgYzAsMTAwNSwzMzEsMTg3OSw5OTIsMjYyMGMwLDk0NywzODMsMTgwNSwxMTQ4LDI1NzYgYzc2Myw3NjgsMTYxNywxMTUyLDI1NjQsMTE1MmM3NDcsNjcyLDE2MjMsMTAwOCwyNjI4LDEwMDggYzEwMDUsMCwxODc5LTMzMSwyNjIwLTk5MmM5NDcsMCwxODA1LTM4MywyNTc2LTExNDggYzc2OC03NjMsMTE1Mi0xNjE3LDExNTItMjU2NGM2NzItNzQ3LDEwMDgtMTYyMywxMDA4LTI2MjggYzAtMTAwNS0zMzEtMTg3OS05OTItMjYyMGMwLTk0Ny0zODMtMTgwNS0xMTQ4LTI1NzYgYy03NjMtNzY4LTE2MTctMTE1Mi0yNTY0LTExNTJjLTc0Ny02NzItMTYyMy0xMDA4LTI2MjgtMTAwOCBjLTEwMDUsMC0xODc5LDMzMS0yNjIwLDk5MmMtOTQ3LDAtMTgwNSwzODMtMjU3NiwxMTQ4IGMtNzY4LDc2My0xMTUyLDE2MTctMTE1MiwyNTY0Yy02NzIsNzQ3LTEwMDgsMTYyMy0xMDA4LDI2MjhaTS02MzM2LDAgYzAtMzc3LDcyLTc0OCwyMTYtMTExMmMyMDAsNTYxLDUwOCwxMDQ3LDkyNCwxNDYwIGM3NzksNzc2LDE3MDQsMTE2NCwyNzc2LDExNjRjNTk1LDAsMTE1Ni0xMjgsMTY4NC0zODQgYy0xMzMsMjkzLTI5MSw1NDktNDcyLDc2OGMtNTg1LDY3Ni0xMjkxLDEwMTQtMjExNywxMDE0IGMtODI2LDAtMTUzNC0yNzMtMjEyNS04MThjLTU5MS01NDUtODg2LTEyNDMtODg2LTIwOTJaTS01MzM2LTI0MjMgYzAtODA5LDI4My0xNDk3LDg0OC0yMDY1YzI4MS0yODEsNTk5LTQ5NSw5NTQtNjQwIGMtMjYzLDU0MS0zOTQsMTEzNy0zOTQsMTc4NmMwLDc2OSwyNDAsMTQ5Nyw3MjEsMjE4MiBjNDgxLDY4NSwxMTEwLDExNjgsMTg4OSwxNDQ4Yy0zNDcsMTM5LTcxMywyMDgtMTA5OCwyMDggYy04MTEsMC0xNTAwLTI4NC0yMDY4LTg1M2MtNTY4LTU2OS04NTItMTI1Ny04NTItMjA2NlpNLTUxMjgsMzUzNCBjNTQxLDI2MywxMTM3LDM5NCwxNzg2LDM5NGM3NjksMCwxNDk3LTI0MCwyMTgyLTcyMSBjNjg1LTQ4MSwxMTY4LTExMTAsMTQ0OC0xODg5YzEzOSwzNDcsMjA4LDcxMywyMDgsMTA5OCBjMCw4MTEtMjg0LDE1MDAtODUzLDIwNjhjLTU2OSw1NjgtMTI1Nyw4NTItMjA2Niw4NTIgYy04MDksMC0xNDk3LTI4My0yMDY1LTg0OGMtMjgxLTI4MS00OTUtNTk5LTY0MC05NTRaTS0yOTEwLTMzMjUgYzAtODI2LDI3My0xNTM0LDgxOC0yMTI1YzU0NS01OTEsMTI0My04ODYsMjA5Mi04ODYgYzM3NywwLDc0OCw3MiwxMTEyLDIxNmMtNTYxLDIwMC0xMDQ3LDUwOC0xNDYwLDkyNCBjLTc3Niw3NzktMTE2NCwxNzA0LTExNjQsMjc3NmMwLDU5NSwxMjgsMTE1NiwzODQsMTY4NCBjLTI5My0xMzMtNTQ5LTI5MS03NjgtNDcyYy02NzYtNTg1LTEwMTQtMTI5MS0xMDE0LTIxMTdaTS0xMTEyLDYxMjAgYzU2MS0yMDAsMTA0Ny01MDgsMTQ2MC05MjRjNzc2LTc3OSwxMTY0LTE3MDQsMTE2NC0yNzc2IGMwLTU5NS0xMjgtMTE1Ni0zODQtMTY4NGMyOTMsMTMzLDU0OSwyOTEsNzY4LDQ3MiBjNjc2LDU4NSwxMDE0LDEyOTEsMTAxNCwyMTE3YzAsODI2LTI3MywxNTM0LTgxOCwyMTI1IGMtNTQ1LDU5MS0xMjQzLDg4Ni0yMDkyLDg4NmMtMzc3LDAtNzQ4LTcyLTExMTItMjE2Wk0tNDk2LTI0MTYgYzAtODExLDI4NC0xNTAwLDg1My0yMDY4YzU2OS01NjgsMTI1Ny04NTIsMjA2Ni04NTIgYzgwOSwwLDE0OTcsMjgzLDIwNjUsODQ4YzI4MSwyODEsNDk1LDU5OSw2NDAsOTU0IGMtNTQxLTI2My0xMTM3LTM5NC0xNzg2LTM5NGMtNzY5LDAtMTQ5NywyNDAtMjE4Miw3MjEgYy02ODUsNDgxLTExNjgsMTExMC0xNDQ4LDE4ODljLTEzOS0zNDctMjA4LTcxMy0yMDgtMTA5OFpNNzM2LTExMjggYzEzMy0yOTMsMjkxLTU0OSw0NzItNzY4YzU4NS02NzYsMTI5MS0xMDE0LDIxMTctMTAxNCBjODI2LDAsMTUzNCwyNzMsMjEyNSw4MThjNTkxLDU0NSw4ODYsMTI0Myw4ODYsMjA5MmMwLDM3Ny03Miw3NDgtMjE2LDExMTIgYy0yMDAtNTYxLTUwOC0xMDQ3LTkyNC0xNDYwYy03NzktNzc2LTE3MDQtMTE2NC0yNzc2LTExNjQgYy01OTUsMC0xMTU2LDEyOC0xNjg0LDM4NFpNMTMxOC0yODhjMzQ3LTEzOSw3MTMtMjA4LDEwOTgtMjA4IGM4MTEsMCwxNTAwLDI4NCwyMDY4LDg1M2M1NjgsNTY5LDg1MiwxMjU3LDg1MiwyMDY2YzAsODA5LTI4MywxNDk3LTg0OCwyMDY1IGMtMjgxLDI4MS01OTksNDk1LTk1NCw2NDBjMjYzLTU0MSwzOTQtMTEzNywzOTQtMTc4NiBjMC03NjktMjQwLTE0OTctNzIxLTIxODJjLTQ4MS02ODUtMTExMC0xMTY4LTE4ODktMTQ0OFoiLz48L3N2Zz4=\"//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXNzZXRzL2ltYWdlcy9sb2dvLnN2Zy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2xvZ28uc3ZnP2JjN2QiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCbGJtTnZaR2x1WnowaVZWUkdMVGdpSUhOMFlXNWtZV3h2Ym1VOUltNXZJajgrQ2p4emRtY2dlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklpQjNhV1IwYUQwaU5qQXdJaUJvWldsbmFIUTlJall3TUNJZ2RtbGxkMEp2ZUQwaU1DQXdJRFl3TUNBMk1EQWlQZ29nSUNBZ1BIQmhkR2dnYzNSNWJHVTlJbVpwYkd3NklDTm1abVlpSUhSeVlXNXpabTl5YlQwaWRISmhibk5zWVhSbEtETXdNQ3d6TURBcElITmpZV3hsS0RBdU1ETTROelVzTFRBdU1ETTROelVwSWlCa1BTSk5MVGN6TkRRdE1USWdZekFzTVRBd05Td3pNekVzTVRnM09TdzVPVElzTWpZeU1HTXdMRGswTnl3ek9ETXNNVGd3TlN3eE1UUTRMREkxTnpZZ1l6YzJNeXczTmpnc01UWXhOeXd4TVRVeUxESTFOalFzTVRFMU1tTTNORGNzTmpjeUxERTJNak1zTVRBd09Dd3lOakk0TERFd01EZ2dZekV3TURVc01Dd3hPRGM1TFRNek1Td3lOakl3TFRrNU1tTTVORGNzTUN3eE9EQTFMVE00TXl3eU5UYzJMVEV4TkRnZ1l6YzJPQzAzTmpNc01URTFNaTB4TmpFM0xERXhOVEl0TWpVMk5HTTJOekl0TnpRM0xERXdNRGd0TVRZeU15d3hNREE0TFRJMk1qZ2dZekF0TVRBd05TMHpNekV0TVRnM09TMDVPVEl0TWpZeU1HTXdMVGswTnkwek9ETXRNVGd3TlMweE1UUTRMVEkxTnpZZ1l5MDNOak10TnpZNExURTJNVGN0TVRFMU1pMHlOVFkwTFRFeE5USmpMVGMwTnkwMk56SXRNVFl5TXkweE1EQTRMVEkyTWpndE1UQXdPQ0JqTFRFd01EVXNNQzB4T0RjNUxETXpNUzB5TmpJd0xEazVNbU10T1RRM0xEQXRNVGd3TlN3ek9ETXRNalUzTml3eE1UUTRJR010TnpZNExEYzJNeTB4TVRVeUxERTJNVGN0TVRFMU1pd3lOVFkwWXkwMk56SXNOelEzTFRFd01EZ3NNVFl5TXkweE1EQTRMREkyTWpoYVRTMDJNek0yTERBZ1l6QXRNemMzTERjeUxUYzBPQ3d5TVRZdE1URXhNbU15TURBc05UWXhMRFV3T0N3eE1EUTNMRGt5TkN3eE5EWXdJR00zTnprc056YzJMREUzTURRc01URTJOQ3d5TnpjMkxERXhOalJqTlRrMUxEQXNNVEUxTmkweE1qZ3NNVFk0TkMwek9EUWdZeTB4TXpNc01qa3pMVEk1TVN3MU5Ea3RORGN5TERjMk9HTXROVGcxTERZM05pMHhNamt4TERFd01UUXRNakV4Tnl3eE1ERTBJR010T0RJMkxEQXRNVFV6TkMweU56TXRNakV5TlMwNE1UaGpMVFU1TVMwMU5EVXRPRGcyTFRFeU5ETXRPRGcyTFRJd09USmFUUzAxTXpNMkxUSTBNak1nWXpBdE9EQTVMREk0TXkweE5EazNMRGcwT0MweU1EWTFZekk0TVMweU9ERXNOVGs1TFRRNU5TdzVOVFF0TmpRd0lHTXRNall6TERVME1TMHpPVFFzTVRFek55MHpPVFFzTVRjNE5tTXdMRGMyT1N3eU5EQXNNVFE1Tnl3M01qRXNNakU0TWlCak5EZ3hMRFk0TlN3eE1URXdMREV4Tmpnc01UZzRPU3d4TkRRNFl5MHpORGNzTVRNNUxUY3hNeXd5TURndE1UQTVPQ3d5TURnZ1l5MDRNVEVzTUMweE5UQXdMVEk0TkMweU1EWTRMVGcxTTJNdE5UWTRMVFUyT1MwNE5USXRNVEkxTnkwNE5USXRNakEyTmxwTkxUVXhNamdzTXpVek5DQmpOVFF4TERJMk15d3hNVE0zTERNNU5Dd3hOemcyTERNNU5HTTNOamtzTUN3eE5EazNMVEkwTUN3eU1UZ3lMVGN5TVNCak5qZzFMVFE0TVN3eE1UWTRMVEV4TVRBc01UUTBPQzB4T0RnNVl6RXpPU3d6TkRjc01qQTRMRGN4TXl3eU1EZ3NNVEE1T0NCak1DdzRNVEV0TWpnMExERTFNREF0T0RVekxESXdOamhqTFRVMk9TdzFOamd0TVRJMU55dzROVEl0TWpBMk5pdzROVElnWXkwNE1Ea3NNQzB4TkRrM0xUSTRNeTB5TURZMUxUZzBPR010TWpneExUSTRNUzAwT1RVdE5UazVMVFkwTUMwNU5UUmFUUzB5T1RFd0xUTXpNalVnWXpBdE9ESTJMREkzTXkweE5UTTBMRGd4T0MweU1USTFZelUwTlMwMU9URXNNVEkwTXkwNE9EWXNNakE1TWkwNE9EWWdZek0zTnl3d0xEYzBPQ3czTWl3eE1URXlMREl4Tm1NdE5UWXhMREl3TUMweE1EUTNMRFV3T0MweE5EWXdMRGt5TkNCakxUYzNOaXczTnprdE1URTJOQ3d4TnpBMExURXhOalFzTWpjM05tTXdMRFU1TlN3eE1qZ3NNVEUxTml3ek9EUXNNVFk0TkNCakxUSTVNeTB4TXpNdE5UUTVMVEk1TVMwM05qZ3RORGN5WXkwMk56WXROVGcxTFRFd01UUXRNVEk1TVMweE1ERTBMVEl4TVRkYVRTMHhNVEV5TERZeE1qQWdZelUyTVMweU1EQXNNVEEwTnkwMU1EZ3NNVFEyTUMwNU1qUmpOemMyTFRjM09Td3hNVFkwTFRFM01EUXNNVEUyTkMweU56YzJJR013TFRVNU5TMHhNamd0TVRFMU5pMHpPRFF0TVRZNE5HTXlPVE1zTVRNekxEVTBPU3d5T1RFc056WTRMRFEzTWlCak5qYzJMRFU0TlN3eE1ERTBMREV5T1RFc01UQXhOQ3d5TVRFM1l6QXNPREkyTFRJM015d3hOVE0wTFRneE9Dd3lNVEkxSUdNdE5UUTFMRFU1TVMweE1qUXpMRGc0TmkweU1Ea3lMRGc0Tm1NdE16YzNMREF0TnpRNExUY3lMVEV4TVRJdE1qRTJXazB0TkRrMkxUSTBNVFlnWXpBdE9ERXhMREk0TkMweE5UQXdMRGcxTXkweU1EWTRZelUyT1MwMU5qZ3NNVEkxTnkwNE5USXNNakEyTmkwNE5USWdZemd3T1N3d0xERTBPVGNzTWpnekxESXdOalVzT0RRNFl6STRNU3d5T0RFc05EazFMRFU1T1N3Mk5EQXNPVFUwSUdNdE5UUXhMVEkyTXkweE1UTTNMVE01TkMweE56ZzJMVE01TkdNdE56WTVMREF0TVRRNU55d3lOREF0TWpFNE1pdzNNakVnWXkwMk9EVXNORGd4TFRFeE5qZ3NNVEV4TUMweE5EUTRMREU0T0RsakxURXpPUzB6TkRjdE1qQTRMVGN4TXkweU1EZ3RNVEE1T0ZwTk56TTJMVEV4TWpnZ1l6RXpNeTB5T1RNc01qa3hMVFUwT1N3ME56SXROelk0WXpVNE5TMDJOellzTVRJNU1TMHhNREUwTERJeE1UY3RNVEF4TkNCak9ESTJMREFzTVRVek5Dd3lOek1zTWpFeU5TdzRNVGhqTlRreExEVTBOU3c0T0RZc01USTBNeXc0T0RZc01qQTVNbU13TERNM055MDNNaXczTkRndE1qRTJMREV4TVRJZ1l5MHlNREF0TlRZeExUVXdPQzB4TURRM0xUa3lOQzB4TkRZd1l5MDNOemt0TnpjMkxURTNNRFF0TVRFMk5DMHlOemMyTFRFeE5qUWdZeTAxT1RVc01DMHhNVFUyTERFeU9DMHhOamcwTERNNE5GcE5NVE14T0MweU9EaGpNelEzTFRFek9TdzNNVE10TWpBNExERXdPVGd0TWpBNElHTTRNVEVzTUN3eE5UQXdMREk0TkN3eU1EWTRMRGcxTTJNMU5qZ3NOVFk1TERnMU1pd3hNalUzTERnMU1pd3lNRFkyWXpBc09EQTVMVEk0TXl3eE5EazNMVGcwT0N3eU1EWTFJR010TWpneExESTRNUzAxT1Rrc05EazFMVGsxTkN3Mk5EQmpNall6TFRVME1Td3pPVFF0TVRFek55d3pPVFF0TVRjNE5pQmpNQzAzTmprdE1qUXdMVEUwT1RjdE56SXhMVEl4T0RKakxUUTRNUzAyT0RVdE1URXhNQzB4TVRZNExURTRPRGt0TVRRME9Gb2lMejQ4TDNOMlp6ND1cIiJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/assets/images/logo.svg\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _js_store_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/store/index */ \"./src/js/store/index.js\");\n/* harmony import */ var _js_components_Root__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/components/Root */ \"./src/js/components/Root.jsx\");\n\n\n\n\nconsole.log(_js_store_index__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getState());\nObject(react_dom__WEBPACK_IMPORTED_MODULE_1__[\"render\"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_js_components_Root__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n  store: _js_store_index__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n}), document.getElementById('root'));\n\nif (true) {\n  module.hot.accept();\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBzdG9yZSBmcm9tICcuL2pzL3N0b3JlL2luZGV4JztcbmltcG9ydCBSb290IGZyb20gJy4vanMvY29tcG9uZW50cy9Sb290JztcblxuY29uc29sZS5sb2coc3RvcmUuZ2V0U3RhdGUoKSk7XG5cbnJlbmRlcihcblx0PFJvb3Qgc3RvcmUgPSB7c3RvcmV9Lz4sXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290Jylcbik7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoKTtcbn0iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/js/actions/actionTypes.js":
/*!***************************************!*\
  !*** ./src/js/actions/actionTypes.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar actionTypes = {\n  CREATE_ARTICLE: 'CREATE_ARTICLE',\n  CREATE_ARTICLE_BEGIN: 'CREATE_ARTICLE_BEGIN',\n  CREATE_ARTICLE_SUCCESS: 'CREATE_ARTICLE_SUCCESS',\n  CREATE_ARTICLE_FAILURE: 'CREATE_ARTICLE_FAILURE',\n  FETCH_ARTICLE: 'FETCH_ARTICLE',\n  FETCH_ARTICLE_BEGIN: 'FETCH_ARTICLE_BEGIN',\n  FETCH_ARTICLE_SUCCESS: 'FETCH_ARTICLE_SUCCESS',\n  FETCH_ARTICLE_FAILURE: 'FETCH_ARTICLE_FAILURE',\n  FETCH_ALL_ARTICLES: 'FETCH_ALL_ARTICLES',\n  FETCH_ALL_ARTICLES_BEGIN: 'FETCH_ALL_ARTICLES_BEGIN',\n  FETCH_ALL_ARTICLES_SUCCESS: 'FETCH_ALL_ARTICLES_SUCCESS',\n  FETCH_ALL_ARTICLES_FAILURE: 'FETCH_ALL_ARTICLES_FAILURE',\n  DELETE_ARTICLE: 'DELETE_ARTICLE',\n  DELETE_ARTICLE_BEGIN: 'DELETE_ARTICLE_BEGIN',\n  DELETE_ARTICLE_SUCCESS: 'DELETE_ARTICLE_SUCCESS',\n  DELETE_ARTICLE_FAILURE: 'DELETE_ARTICLE_FAILURE'\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (actionTypes);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvYWN0aW9ucy9hY3Rpb25UeXBlcy5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qcy9hY3Rpb25zL2FjdGlvblR5cGVzLmpzP2E2MmYiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYWN0aW9uVHlwZXMgPSB7XG5cdENSRUFURV9BUlRJQ0xFIDogJ0NSRUFURV9BUlRJQ0xFJyxcblx0Q1JFQVRFX0FSVElDTEVfQkVHSU4gOiAnQ1JFQVRFX0FSVElDTEVfQkVHSU4nLFxuXHRDUkVBVEVfQVJUSUNMRV9TVUNDRVNTIDogJ0NSRUFURV9BUlRJQ0xFX1NVQ0NFU1MnLFxuXHRDUkVBVEVfQVJUSUNMRV9GQUlMVVJFIDogJ0NSRUFURV9BUlRJQ0xFX0ZBSUxVUkUnLFxuXHRGRVRDSF9BUlRJQ0xFIDogJ0ZFVENIX0FSVElDTEUnLFxuXHRGRVRDSF9BUlRJQ0xFX0JFR0lOIDogJ0ZFVENIX0FSVElDTEVfQkVHSU4nLFxuXHRGRVRDSF9BUlRJQ0xFX1NVQ0NFU1MgOiAnRkVUQ0hfQVJUSUNMRV9TVUNDRVNTJyxcblx0RkVUQ0hfQVJUSUNMRV9GQUlMVVJFIDogJ0ZFVENIX0FSVElDTEVfRkFJTFVSRScsXG5cdEZFVENIX0FMTF9BUlRJQ0xFUyA6ICdGRVRDSF9BTExfQVJUSUNMRVMnLFxuXHRGRVRDSF9BTExfQVJUSUNMRVNfQkVHSU4gOiAnRkVUQ0hfQUxMX0FSVElDTEVTX0JFR0lOJyxcblx0RkVUQ0hfQUxMX0FSVElDTEVTX1NVQ0NFU1MgOiAnRkVUQ0hfQUxMX0FSVElDTEVTX1NVQ0NFU1MnLFxuXHRGRVRDSF9BTExfQVJUSUNMRVNfRkFJTFVSRSA6ICdGRVRDSF9BTExfQVJUSUNMRVNfRkFJTFVSRScsXG5cdERFTEVURV9BUlRJQ0xFIDogJ0RFTEVURV9BUlRJQ0xFJyxcblx0REVMRVRFX0FSVElDTEVfQkVHSU4gOiAnREVMRVRFX0FSVElDTEVfQkVHSU4nLFxuXHRERUxFVEVfQVJUSUNMRV9TVUNDRVNTIDogJ0RFTEVURV9BUlRJQ0xFX1NVQ0NFU1MnLFxuXHRERUxFVEVfQVJUSUNMRV9GQUlMVVJFIDogJ0RFTEVURV9BUlRJQ0xFX0ZBSUxVUkUnXG59O1xuXG5leHBvcnQgZGVmYXVsdCBhY3Rpb25UeXBlcztcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBaEJBO0FBbUJBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/actions/actionTypes.js\n");

/***/ }),

/***/ "./src/js/actions/articleActions.js":
/*!******************************************!*\
  !*** ./src/js/actions/articleActions.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actionTypes */ \"./src/js/actions/actionTypes.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n\n\n/**\n * API BASE URL\n * */\n\nvar baseUrl = 'https://reduxblog.herokuapp.com/api';\n/**\n * API Key:\n * */\n\nvar apiKey = 123;\n/**\n * Allowed Request Types: GET, POST\n * */\n\nvar articles = '/posts';\n/**\n * Allowed Request Types: GET, DELETE\n * */\n\nvar oneArticle = '/post/:id';\n\nvar fetchAllArticlesBegin = function fetchAllArticlesBegin() {\n  return {\n    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"default\"].FETCH_ALL_ARTICLES_BEGIN\n  };\n};\n\nvar fetchAllArticlesSuccess = function fetchAllArticlesSuccess(articles) {\n  return {\n    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"default\"].FETCH_ALL_ARTICLES_SUCCESS,\n    payload: {\n      articles: articles\n    }\n  };\n};\n\nvar fetchAllArticlesFailure = function fetchAllArticlesFailure(error) {\n  return {\n    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"default\"].FETCH_ALL_ARTICLES_FAILURE,\n    payload: {\n      error: error\n    }\n  };\n};\n\nvar fetchAllArticles = function fetchAllArticles() {\n  return function (dispatch) {\n    dispatch(fetchAllArticlesBegin());\n    axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(\"\".concat(baseUrl, \"/\").concat(articles), {\n      params: {\n        key: apiKey\n      }\n    }).then(function (response) {\n      if (response.status !== 200) {\n        throw Error(response.statusText);\n      }\n\n      return response;\n    }).then(function (response) {\n      //console.log(response);\n      dispatch(fetchAllArticlesSuccess(response.data));\n    })[\"catch\"](function (error) {\n      //console.log(error);\n      dispatch(fetchAllArticlesFailure(error));\n    });\n  };\n};\n\nvar articleActionCreators = {\n  fetchAllArticlesBegin: fetchAllArticlesBegin,\n  fetchAllArticlesSuccess: fetchAllArticlesSuccess,\n  fetchAllArticlesFailure: fetchAllArticlesFailure,\n  fetchAllArticles: fetchAllArticles\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (articleActionCreators);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvYWN0aW9ucy9hcnRpY2xlQWN0aW9ucy5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qcy9hY3Rpb25zL2FydGljbGVBY3Rpb25zLmpzP2RjODkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFjdGlvblR5cGVzIGZyb20gJy4vYWN0aW9uVHlwZXMnO1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuLyoqXG4gKiBBUEkgQkFTRSBVUkxcbiAqICovXG5jb25zdCBiYXNlVXJsID0gJ2h0dHBzOi8vcmVkdXhibG9nLmhlcm9rdWFwcC5jb20vYXBpJztcblxuLyoqXG4gKiBBUEkgS2V5OlxuICogKi9cbmNvbnN0IGFwaUtleSA9IDEyMztcblxuLyoqXG4gKiBBbGxvd2VkIFJlcXVlc3QgVHlwZXM6IEdFVCwgUE9TVFxuICogKi9cbmNvbnN0IGFydGljbGVzID0gJy9wb3N0cyc7XG5cbi8qKlxuICogQWxsb3dlZCBSZXF1ZXN0IFR5cGVzOiBHRVQsIERFTEVURVxuICogKi9cbmNvbnN0IG9uZUFydGljbGUgPSAnL3Bvc3QvOmlkJztcblxuXG5jb25zdCBmZXRjaEFsbEFydGljbGVzQmVnaW4gPSAoKSA9PiAoe1xuXHR0eXBlOiBhY3Rpb25UeXBlcy5GRVRDSF9BTExfQVJUSUNMRVNfQkVHSU5cbn0pO1xuXG5jb25zdCBmZXRjaEFsbEFydGljbGVzU3VjY2VzcyA9IChhcnRpY2xlcykgPT4gKHtcblx0dHlwZTogYWN0aW9uVHlwZXMuRkVUQ0hfQUxMX0FSVElDTEVTX1NVQ0NFU1MsXG5cdHBheWxvYWQ6IHthcnRpY2xlc31cbn0pO1xuXG5jb25zdCBmZXRjaEFsbEFydGljbGVzRmFpbHVyZSA9IChlcnJvcikgPT4gKHtcblx0dHlwZTogYWN0aW9uVHlwZXMuRkVUQ0hfQUxMX0FSVElDTEVTX0ZBSUxVUkUsXG5cdHBheWxvYWQ6IHtlcnJvcn1cbn0pO1xuXG5jb25zdCBmZXRjaEFsbEFydGljbGVzID0gKCkgPT4ge1xuXHRyZXR1cm4gZGlzcGF0Y2ggPT4ge1xuXHRcdGRpc3BhdGNoKGZldGNoQWxsQXJ0aWNsZXNCZWdpbigpKTtcblx0XHRheGlvcy5nZXQoYCR7YmFzZVVybH0vJHthcnRpY2xlc31gLCB7XG5cdFx0XHRwYXJhbXM6IHtcblx0XHRcdFx0a2V5OiBhcGlLZXlcblx0XHRcdH1cblx0XHR9KVxuXHRcdFx0LnRoZW4oKHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdGlmKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG5cdFx0XHRcdFx0dGhyb3cgRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHRcdFx0fSlcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZyhyZXNwb25zZSk7XG5cdFx0XHRcdGRpc3BhdGNoKGZldGNoQWxsQXJ0aWNsZXNTdWNjZXNzKHJlc3BvbnNlLmRhdGEpKTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goKGVycm9yKSA9PiB7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coZXJyb3IpO1xuXHRcdFx0XHRkaXNwYXRjaChmZXRjaEFsbEFydGljbGVzRmFpbHVyZShlcnJvcikpO1xuXHRcdFx0fSk7XG5cdH07XG59O1xuXG5jb25zdCBhcnRpY2xlQWN0aW9uQ3JlYXRvcnMgPSB7XG5cdGZldGNoQWxsQXJ0aWNsZXNCZWdpbixcblx0ZmV0Y2hBbGxBcnRpY2xlc1N1Y2Nlc3MsXG5cdGZldGNoQWxsQXJ0aWNsZXNGYWlsdXJlLFxuXHRmZXRjaEFsbEFydGljbGVzXG59O1xuXG5leHBvcnQgZGVmYXVsdCBhcnRpY2xlQWN0aW9uQ3JlYXRvcnM7XG5cbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUE7Ozs7QUFHQTtBQUVBOzs7O0FBR0E7QUFFQTs7OztBQUdBO0FBRUE7Ozs7QUFHQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBRkE7QUFBQTtBQUNBO0FBSUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBRkE7QUFBQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFEQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU9BIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/actions/articleActions.js\n");

/***/ }),

/***/ "./src/js/components/App.jsx":
/*!***********************************!*\
  !*** ./src/js/components/App.jsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Header */ \"./src/js/components/Header.jsx\");\n/* harmony import */ var _Main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Main */ \"./src/js/components/Main.jsx\");\n/* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Footer */ \"./src/js/components/Footer.jsx\");\n/* harmony import */ var _UpToTop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UpToTop */ \"./src/js/components/UpToTop.jsx\");\n/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bootstrap */ \"./node_modules/bootstrap/dist/js/bootstrap.js\");\n/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bootstrap__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.min.css */ \"./node_modules/bootstrap/dist/css/bootstrap.min.css\");\n/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\n\nvar App = function App() {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"app\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Header__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Main__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Footer__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_UpToTop__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvY29tcG9uZW50cy9BcHAuanN4LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvQXBwLmpzeD80MjIwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVhZGVyIGZyb20gJy4vSGVhZGVyJztcbmltcG9ydCBNYWluIGZyb20gJy4vTWFpbic7XG5pbXBvcnQgRm9vdGVyIGZyb20gJy4vRm9vdGVyJztcbmltcG9ydCBVcFRvVG9wIGZyb20gJy4vVXBUb1RvcCc7XG5pbXBvcnQgJ2Jvb3RzdHJhcCc7XG5pbXBvcnQgJ2Jvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAubWluLmNzcyc7XG5cbmNvbnN0IEFwcCA9ICgpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFwcFwiPlxuXHRcdFx0PEhlYWRlciAvPlxuXHRcdFx0PE1haW4gLz5cblx0XHRcdDxGb290ZXIgLz5cblx0XHRcdDxVcFRvVG9wIC8+XG5cdFx0PC9kaXY+XG5cdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcHA7Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBT0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/components/App.jsx\n");

/***/ }),

/***/ "./src/js/components/Article.jsx":
/*!***************************************!*\
  !*** ./src/js/components/Article.jsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactstrap */ \"./node_modules/reactstrap/es/index.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\nvar Article =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(Article, _Component);\n\n  function Article(props) {\n    var _this;\n\n    _classCallCheck(this, Article);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Article).call(this, props));\n    _this.state = {\n      title: \"\",\n      content: \"\",\n      categories: \"\"\n    };\n    return _this;\n  }\n\n  _createClass(Article, [{\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__[\"Form\"], {\n        className: \"articleForm form\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__[\"FormGroup\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__[\"Label\"], {\n        \"for\": \"title\"\n      }, \"Title\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__[\"Input\"], {\n        type: \"text\",\n        name: \"title\",\n        id: \"title\",\n        placeholder: \"Title\"\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__[\"FormGroup\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__[\"Label\"], {\n        \"for\": \"content\"\n      }, \"Content\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__[\"Input\"], {\n        type: \"textarea\",\n        name: \"content\",\n        id: \"content\",\n        placeholder: \"Content\"\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__[\"FormGroup\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__[\"Label\"], {\n        \"for\": \"categories\"\n      }, \"Categories\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__[\"Input\"], {\n        type: \"textarea\",\n        name: \"categories\",\n        id: \"categories\",\n        placeholder: \"Categories\"\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__[\"Button\"], {\n        type: \"submit\",\n        color: \"success\"\n      }, \"Add Article\"));\n    }\n  }]);\n\n  return Article;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Article);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvY29tcG9uZW50cy9BcnRpY2xlLmpzeC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL0FydGljbGUuanN4PzViZTQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG5cdEZvcm0sXG5cdEZvcm1Hcm91cCxcblx0QnV0dG9uLFxuXHRJbnB1dCxcblx0TGFiZWxcbn0gZnJvbSAncmVhY3RzdHJhcCc7XG5cbmNsYXNzIEFydGljbGUgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHRcdHRoaXMuc3RhdGUgPSB7XG5cdFx0XHR0aXRsZTogXCJcIixcblx0XHRcdGNvbnRlbnQ6IFwiXCIsXG5cdFx0XHRjYXRlZ29yaWVzOiBcIlwiXG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiA8Rm9ybSBjbGFzc05hbWU9XCJhcnRpY2xlRm9ybSBmb3JtXCI+XG5cdFx0XHQ8Rm9ybUdyb3VwPlxuXHRcdFx0XHQ8TGFiZWwgZm9yPVwidGl0bGVcIj5UaXRsZTwvTGFiZWw+XG5cdFx0XHRcdDxJbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ0aXRsZVwiIGlkPVwidGl0bGVcIiBwbGFjZWhvbGRlcj1cIlRpdGxlXCIgLz5cblx0XHRcdDwvRm9ybUdyb3VwPlxuXHRcdFx0PEZvcm1Hcm91cD5cblx0XHRcdFx0PExhYmVsIGZvcj1cImNvbnRlbnRcIj5Db250ZW50PC9MYWJlbD5cblx0XHRcdFx0PElucHV0IHR5cGU9XCJ0ZXh0YXJlYVwiIG5hbWU9XCJjb250ZW50XCIgaWQ9XCJjb250ZW50XCIgcGxhY2Vob2xkZXI9XCJDb250ZW50XCIgLz5cblx0XHRcdDwvRm9ybUdyb3VwPlxuXHRcdFx0PEZvcm1Hcm91cD5cblx0XHRcdFx0PExhYmVsIGZvcj1cImNhdGVnb3JpZXNcIj5DYXRlZ29yaWVzPC9MYWJlbD5cblx0XHRcdFx0PElucHV0IHR5cGU9XCJ0ZXh0YXJlYVwiIG5hbWU9XCJjYXRlZ29yaWVzXCIgaWQ9XCJjYXRlZ29yaWVzXCIgcGxhY2Vob2xkZXI9XCJDYXRlZ29yaWVzXCIgLz5cblx0XHRcdDwvRm9ybUdyb3VwPlxuXHRcdFx0PEJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY29sb3I9XCJzdWNjZXNzXCI+QWRkIEFydGljbGU8L0J1dHRvbj5cblx0XHQ8L0Zvcm0+XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXJ0aWNsZTsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFPQTs7Ozs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBSEE7QUFRQTtBQUNBOzs7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUVBOzs7O0FBM0JBO0FBQ0E7QUE2QkEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/js/components/Article.jsx\n");

/***/ }),

/***/ "./src/js/components/ArticlesList.jsx":
/*!********************************************!*\
  !*** ./src/js/components/ArticlesList.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n/* harmony import */ var _actions_articleActions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions/articleActions */ \"./src/js/actions/articleActions.js\");\n/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! reactstrap */ \"./node_modules/reactstrap/es/index.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\n\n\n\nvar ArticlesList =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(ArticlesList, _React$Component);\n\n  function ArticlesList(props) {\n    var _this;\n\n    _classCallCheck(this, ArticlesList);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(ArticlesList).call(this, props));\n    var dispatch = props.dispatch;\n    _this.boundActionCreators = Object(redux__WEBPACK_IMPORTED_MODULE_1__[\"bindActionCreators\"])(_actions_articleActions__WEBPACK_IMPORTED_MODULE_4__[\"default\"], dispatch);\n    console.log(_this.boundActionCreators);\n    return _this;\n  }\n\n  _createClass(ArticlesList, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      var dispatch = this.props.dispatch;\n      var action = _actions_articleActions__WEBPACK_IMPORTED_MODULE_4__[\"default\"].fetchAllArticles();\n      dispatch(action);\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this$props = this.props,\n          articles = _this$props.articles,\n          loading = _this$props.loading,\n          error = _this$props.error;\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", null, \"State and Errors\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, \"Loading: \", loading.toString()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, \"Error: \", error ? error.toString() : \"null\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", null, \"Articles\"), articles && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", {\n        className: \"artilces\"\n      }, articles.length ? articles.map(function (article) {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n          key: article.id\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\", null, article.title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_5__[\"Button\"], {\n          color: \"danger\"\n        }, \"Secondary\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"content\"\n        }, article.content), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"categories\"\n        }, article.categories));\n      }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", null, \"No Articles Found\")));\n    }\n  }]);\n\n  return ArticlesList;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\nvar mapStateToProps = function mapStateToProps(state) {\n  console.log(state);\n  return {\n    articles: state.articles.articles,\n    loading: state.articles.loading,\n    error: state.articles.error\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"withRouter\"])(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__[\"connect\"])(mapStateToProps)(ArticlesList)));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvY29tcG9uZW50cy9BcnRpY2xlc0xpc3QuanN4LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvQXJ0aWNsZXNMaXN0LmpzeD81NjE3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBiaW5kQWN0aW9uQ3JlYXRvcnMgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgd2l0aFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IGFydGljbGVBY3Rpb25DcmVhdG9ycyBmcm9tICcuLi9hY3Rpb25zL2FydGljbGVBY3Rpb25zJztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJ3JlYWN0c3RyYXAnO1xuXG5jbGFzcyBBcnRpY2xlc0xpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHRcdGNvbnN0IHsgZGlzcGF0Y2ggfSA9IHByb3BzO1xuXHRcdHRoaXMuYm91bmRBY3Rpb25DcmVhdG9ycyA9IGJpbmRBY3Rpb25DcmVhdG9ycyhhcnRpY2xlQWN0aW9uQ3JlYXRvcnMsIGRpc3BhdGNoKTtcblx0XHRjb25zb2xlLmxvZyh0aGlzLmJvdW5kQWN0aW9uQ3JlYXRvcnMpO1xuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0bGV0IHsgZGlzcGF0Y2ggfSA9IHRoaXMucHJvcHM7XG5cblx0XHRsZXQgYWN0aW9uID0gYXJ0aWNsZUFjdGlvbkNyZWF0b3JzLmZldGNoQWxsQXJ0aWNsZXMoKTtcblx0XHRkaXNwYXRjaChhY3Rpb24pO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdGxldCB7YXJ0aWNsZXMsIGxvYWRpbmcsIGVycm9yfSA9IHRoaXMucHJvcHM7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PGgxPlN0YXRlIGFuZCBFcnJvcnM8L2gxPlxuXHRcdFx0XHQ8ZGl2PkxvYWRpbmc6IHtsb2FkaW5nLnRvU3RyaW5nKCl9PC9kaXY+XG5cdFx0XHRcdDxkaXY+RXJyb3I6IHtlcnJvciA/IGVycm9yLnRvU3RyaW5nKCkgOiBcIm51bGxcIn08L2Rpdj5cblxuXHRcdFx0XHQ8aDE+QXJ0aWNsZXM8L2gxPlxuXHRcdFx0XHR7YXJ0aWNsZXMgJiYgPHVsIGNsYXNzTmFtZT1cImFydGlsY2VzXCI+XG5cdFx0XHRcdFx0e2FydGljbGVzLmxlbmd0aCA/IGFydGljbGVzLm1hcChhcnRpY2xlID0+XG5cdFx0XHRcdFx0XHQ8bGkga2V5PXthcnRpY2xlLmlkfT5cblx0XHRcdFx0XHRcdFx0PGgyPnthcnRpY2xlLnRpdGxlfTwvaDI+XG5cdFx0XHRcdFx0XHRcdDxCdXR0b24gY29sb3I9XCJkYW5nZXJcIj5TZWNvbmRhcnk8L0J1dHRvbj5cblxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIj57YXJ0aWNsZS5jb250ZW50fTwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNhdGVnb3JpZXNcIj57YXJ0aWNsZS5jYXRlZ29yaWVzfTwvZGl2PlxuXHRcdFx0XHRcdFx0PC9saT4pXG5cdFx0XHRcdFx0XHQ6XG5cdFx0XHRcdFx0XHQ8bGk+Tm8gQXJ0aWNsZXMgRm91bmQ8L2xpPn1cblx0XHRcdFx0XHQ8L3VsPlxuXHRcdFx0XHR9XG5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4ge1xuXHRjb25zb2xlLmxvZyhzdGF0ZSk7XG5cdHJldHVybiB7XG5cdFx0YXJ0aWNsZXM6IHN0YXRlLmFydGljbGVzLmFydGljbGVzLFxuXHRcdGxvYWRpbmc6IHN0YXRlLmFydGljbGVzLmxvYWRpbmcsXG5cdFx0ZXJyb3I6IHN0YXRlLmFydGljbGVzLmVycm9yXG5cdH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoUm91dGVyKGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzKShBcnRpY2xlc0xpc3QpKTsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFEQTtBQUlBO0FBQ0E7QUFMQTtBQU1BO0FBQ0E7OztBQUNBO0FBQUE7QUFHQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQU9BO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFOQTtBQWVBOzs7O0FBMUNBO0FBQ0E7QUE0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/js/components/ArticlesList.jsx\n");

/***/ }),

/***/ "./src/js/components/FontAwesomeLibrary.jsx":
/*!**************************************************!*\
  !*** ./src/js/components/FontAwesomeLibrary.jsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ \"./node_modules/@fortawesome/fontawesome-svg-core/index.es.js\");\n/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ \"./node_modules/@fortawesome/free-solid-svg-icons/index.es.js\");\n\n\n\n\n\n\n_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_0__[\"library\"].add(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__[\"faCoffee\"]);\n_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_0__[\"library\"].add(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__[\"faMugHot\"]);\n_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_0__[\"library\"].add(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__[\"faTimes\"]);\n_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_0__[\"library\"].add(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__[\"faBars\"]);\n_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_0__[\"library\"].add(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__[\"faChevronUp\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_0__[\"library\"]);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvY29tcG9uZW50cy9Gb250QXdlc29tZUxpYnJhcnkuanN4LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvRm9udEF3ZXNvbWVMaWJyYXJ5LmpzeD8xZDYwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGxpYnJhcnkgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUnO1xuaW1wb3J0IHsgZmFDb2ZmZWUgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuaW1wb3J0IHsgZmFNdWdIb3QgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuaW1wb3J0IHsgZmFUaW1lcyB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucyc7XG5pbXBvcnQgeyBmYUJhcnMgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuaW1wb3J0IHsgZmFDaGV2cm9uVXAgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuXG5saWJyYXJ5LmFkZChmYUNvZmZlZSk7XG5saWJyYXJ5LmFkZChmYU11Z0hvdCk7XG5saWJyYXJ5LmFkZChmYVRpbWVzKTtcbmxpYnJhcnkuYWRkKGZhQmFycyk7XG5saWJyYXJ5LmFkZChmYUNoZXZyb25VcCk7XG5cbmV4cG9ydCBkZWZhdWx0IGxpYnJhcnk7XG5cbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/components/FontAwesomeLibrary.jsx\n");

/***/ }),

/***/ "./src/js/components/Footer.jsx":
/*!**************************************!*\
  !*** ./src/js/components/Footer.jsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reactstrap */ \"./node_modules/reactstrap/es/index.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\nvar Footer =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(Footer, _Component);\n\n  function Footer() {\n    _classCallCheck(this, Footer);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(Footer).apply(this, arguments));\n  }\n\n  _createClass(Footer, [{\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"footer\", {\n        className: \"footer\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"section\", {\n        className: \"container\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__[\"Navbar\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__[\"Nav\"], {\n        className: \"routes\",\n        navbar: true\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__[\"NavItem\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n        to: \"/\"\n      }, \"Articles\")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__[\"NavItem\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n        to: \"/articles/new\"\n      }, \"New Article\"))))));\n    }\n  }]);\n\n  return Footer;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Footer);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvY29tcG9uZW50cy9Gb290ZXIuanN4LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvRm9vdGVyLmpzeD8yNjQzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQge1xuXHROYXZiYXIsXG5cdE5hdixcblx0TmF2SXRlbSB9IGZyb20gJ3JlYWN0c3RyYXAnO1xuXG5jbGFzcyBGb290ZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuKFxuXHRcdFx0PGZvb3RlciBjbGFzc05hbWU9XCJmb290ZXJcIj5cblx0XHRcdFx0PHNlY3Rpb24gY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0PE5hdmJhcj5cblx0XHRcdFx0XHRcdDxOYXYgY2xhc3NOYW1lPVwicm91dGVzXCIgbmF2YmFyPlxuXHRcdFx0XHRcdFx0XHQ8TmF2SXRlbT5cblx0XHRcdFx0XHRcdFx0XHQ8TGluayB0bz1cIi9cIj5BcnRpY2xlczwvTGluaz5cblx0XHRcdFx0XHRcdFx0PC9OYXZJdGVtPlxuXHRcdFx0XHRcdFx0XHQ8TmF2SXRlbT5cblx0XHRcdFx0XHRcdFx0XHQ8TGluayB0bz1cIi9hcnRpY2xlcy9uZXdcIj5OZXcgQXJ0aWNsZTwvTGluaz5cblx0XHRcdFx0XHRcdFx0PC9OYXZJdGVtPlxuXHRcdFx0XHRcdFx0PC9OYXY+XG5cdFx0XHRcdFx0PC9OYXZiYXI+XG5cdFx0XHRcdDwvc2VjdGlvbj5cblx0XHRcdDwvZm9vdGVyPlxuXHRcdCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRm9vdGVyOyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUlBOzs7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUdBO0FBQUE7QUFPQTs7OztBQWxCQTtBQUNBO0FBb0JBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/components/Footer.jsx\n");

/***/ }),

/***/ "./src/js/components/FormContainer.jsx":
/*!*********************************************!*\
  !*** ./src/js/components/FormContainer.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\nvar propTypes = {\n  text: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string\n};\nvar defaultProps = {\n  text: 'Hello'\n};\n\nvar FormContainer =\n/*#__PURE__*/\nfunction (_PureComponent) {\n  _inherits(FormContainer, _PureComponent);\n\n  function FormContainer() {\n    _classCallCheck(this, FormContainer);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(FormContainer).apply(this, arguments));\n  }\n\n  _createClass(FormContainer, [{\n    key: \"render\",\n    value: function render() {\n      var text = this.props.text;\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"form\", {\n        className: \"article-form\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", {\n        className: \"\"\n      }, text));\n    }\n  }]);\n\n  return FormContainer;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"PureComponent\"]);\n\nFormContainer.propTypes = propTypes;\nFormContainer.defaultProps = defaultProps;\n/* harmony default export */ __webpack_exports__[\"default\"] = (FormContainer);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvY29tcG9uZW50cy9Gb3JtQ29udGFpbmVyLmpzeC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL0Zvcm1Db250YWluZXIuanN4PzdkODEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBwcm9wVHlwZXMgPSB7XG5cdHRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XG5cdHRleHQ6ICdIZWxsbycsXG59O1xuXG5jbGFzcyBGb3JtQ29udGFpbmVyIGV4dGVuZHMgUHVyZUNvbXBvbmVudCB7XG5cdHJlbmRlcigpIHtcblx0XHRjb25zdCB7IHRleHQgfSA9IHRoaXMucHJvcHM7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxmb3JtIGNsYXNzTmFtZT1cImFydGljbGUtZm9ybVwiPlxuXHRcdFx0XHQ8aDEgY2xhc3NOYW1lPVwiXCI+XG5cdFx0XHRcdFx0eyB0ZXh0IH1cblx0XHRcdFx0PC9oMT5cblx0XHRcdDwvZm9ybT5cblx0XHQpO1xuXHR9XG59XG5cbkZvcm1Db250YWluZXIucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuRm9ybUNvbnRhaW5lci5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG5cbmV4cG9ydCBkZWZhdWx0IEZvcm1Db250YWluZXI7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUtBOzs7O0FBVkE7QUFDQTtBQVlBO0FBQ0E7QUFFQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/js/components/FormContainer.jsx\n");

/***/ }),

/***/ "./src/js/components/Header.jsx":
/*!**************************************!*\
  !*** ./src/js/components/Header.jsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ \"./node_modules/@fortawesome/react-fontawesome/index.es.js\");\n/* harmony import */ var _FontAwesomeLibrary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FontAwesomeLibrary */ \"./src/js/components/FontAwesomeLibrary.jsx\");\n/* harmony import */ var _assets_images_logo_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../assets/images/logo.svg */ \"./src/assets/images/logo.svg\");\n/* harmony import */ var _assets_images_logo_svg__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_assets_images_logo_svg__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! reactstrap */ \"./node_modules/reactstrap/es/index.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\n\n\n\n\n\n\n\nvar Header =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(Header, _Component);\n\n  function Header(props) {\n    var _this;\n\n    _classCallCheck(this, Header);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Header).call(this, props));\n    _this.toggle = _this.toggle.bind(_assertThisInitialized(_assertThisInitialized(_this)));\n    _this.closeNavbar = _this.closeNavbar.bind(_assertThisInitialized(_assertThisInitialized(_this)));\n    _this.handleClickOutside = _this.handleClickOutside.bind(_assertThisInitialized(_assertThisInitialized(_this)));\n    _this.state = {\n      isOpen: false\n    };\n    return _this;\n  }\n\n  _createClass(Header, [{\n    key: \"componentWillMount\",\n    value: function componentWillMount() {\n      document.addEventListener('mousedown', this.handleClickOutside);\n    }\n  }, {\n    key: \"componentWillUnmount\",\n    value: function componentWillUnmount() {\n      document.removeEventListener('mousedown', this.handleClickOutside);\n    }\n  }, {\n    key: \"toggle\",\n    value: function toggle() {\n      this.setState({\n        isOpen: !this.state.isOpen\n      });\n    }\n  }, {\n    key: \"closeNavbar\",\n    value: function closeNavbar() {\n      this.setState({\n        isOpen: false\n      });\n    }\n  }, {\n    key: \"handleClickOutside\",\n    value: function handleClickOutside(event) {\n      var t = event.target;\n\n      if (this.state.isOpen && !t.classList.contains('navbar-toggler')) {\n        this.closeNavbar();\n      }\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"topBar\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"section\", {\n        className: \"container\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_5__[\"Navbar\"], {\n        color: \"light\",\n        className: \"header\",\n        expand: \"md\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n        className: \"locoLink\",\n        to: \"/\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n        src: _assets_images_logo_svg__WEBPACK_IMPORTED_MODULE_4___default.a,\n        className: \"logo\",\n        alt: \"logo\"\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n        to: \"/\",\n        className: \"logoCompany\"\n      }, \"Redux Blog\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_5__[\"NavbarToggler\"], {\n        onClick: this.toggle\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__[\"FontAwesomeIcon\"], {\n        icon: this.state.isOpen ? \"times\" : \"bars\"\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_5__[\"Collapse\"], {\n        isOpen: this.state.isOpen,\n        navbar: true\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_5__[\"Nav\"], {\n        className: \"ml-auto routes\",\n        navbar: true\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_5__[\"NavItem\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n        to: \"/\",\n        onClick: this.closeNavbar\n      }, \"Articles\")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_5__[\"NavItem\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n        to: \"/articles/new\",\n        onClick: this.closeNavbar\n      }, \"New Article\")))))));\n    }\n  }]);\n\n  return Header;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Header);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvY29tcG9uZW50cy9IZWFkZXIuanN4LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvSGVhZGVyLmpzeD80NjNhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBGb250QXdlc29tZUljb24gfSBmcm9tICdAZm9ydGF3ZXNvbWUvcmVhY3QtZm9udGF3ZXNvbWUnO1xuaW1wb3J0IGxpYnJhcnkgZnJvbSAnLi9Gb250QXdlc29tZUxpYnJhcnknO1xuaW1wb3J0IGxvZ28gZnJvbSAnLi4vLi4vYXNzZXRzL2ltYWdlcy9sb2dvLnN2Zyc7XG5cbmltcG9ydCB7XG5cdENvbGxhcHNlLFxuXHROYXZiYXIsXG5cdE5hdmJhclRvZ2dsZXIsXG5cdE5hdixcblx0TmF2SXRlbSB9IGZyb20gJ3JlYWN0c3RyYXAnO1xuXG5jbGFzcyBIZWFkZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHRcdHRoaXMudG9nZ2xlID0gdGhpcy50b2dnbGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNsb3NlTmF2YmFyID0gdGhpcy5jbG9zZU5hdmJhci5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaGFuZGxlQ2xpY2tPdXRzaWRlID0gdGhpcy5oYW5kbGVDbGlja091dHNpZGUuYmluZCh0aGlzKTtcblxuXHRcdHRoaXMuc3RhdGUgPSB7XG5cdFx0XHRpc09wZW46IGZhbHNlLFxuXHRcdH07XG5cdH1cblx0Y29tcG9uZW50V2lsbE1vdW50KCkge1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlQ2xpY2tPdXRzaWRlKTtcblx0fVxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZUNsaWNrT3V0c2lkZSk7XG5cdH1cblxuXHR0b2dnbGUoKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRpc09wZW46ICF0aGlzLnN0YXRlLmlzT3BlblxuXHRcdH0pO1xuXHR9XG5cdGNsb3NlTmF2YmFyKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0aXNPcGVuOiBmYWxzZVxuXHRcdH0pO1xuXHR9XG5cdGhhbmRsZUNsaWNrT3V0c2lkZShldmVudCkge1xuXHRcdGNvbnN0IHQgPSBldmVudC50YXJnZXQ7XG5cdFx0aWYgKHRoaXMuc3RhdGUuaXNPcGVuICYmICF0LmNsYXNzTGlzdC5jb250YWlucygnbmF2YmFyLXRvZ2dsZXInKSkge1xuXHRcdFx0dGhpcy5jbG9zZU5hdmJhcigpO1xuXHRcdH1cblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ0b3BCYXJcIj5cblx0XHRcdFx0PHNlY3Rpb24gY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0PE5hdmJhciBjb2xvcj1cImxpZ2h0XCIgY2xhc3NOYW1lPVwiaGVhZGVyXCIgZXhwYW5kPVwibWRcIj5cblx0XHRcdFx0XHRcdDxMaW5rIGNsYXNzTmFtZT1cImxvY29MaW5rXCIgdG89XCIvXCI+PGltZyBzcmM9e2xvZ299IGNsYXNzTmFtZT1cImxvZ29cIiBhbHQ9XCJsb2dvXCIgLz48L0xpbms+XG5cdFx0XHRcdFx0XHQ8TGluayB0bz1cIi9cIiBjbGFzc05hbWU9XCJsb2dvQ29tcGFueVwiPlJlZHV4IEJsb2c8L0xpbms+XG5cdFx0XHRcdFx0XHQ8TmF2YmFyVG9nZ2xlciBvbkNsaWNrPXt0aGlzLnRvZ2dsZX0+XG5cdFx0XHRcdFx0XHRcdDxGb250QXdlc29tZUljb24gaWNvbj17dGhpcy5zdGF0ZS5pc09wZW4gPyBcInRpbWVzXCIgOiBcImJhcnNcIn0vPlxuXHRcdFx0XHRcdFx0PC9OYXZiYXJUb2dnbGVyPlxuXHRcdFx0XHRcdFx0PENvbGxhcHNlIGlzT3Blbj17dGhpcy5zdGF0ZS5pc09wZW59IG5hdmJhcj5cblx0XHRcdFx0XHRcdFx0PE5hdiBjbGFzc05hbWU9XCJtbC1hdXRvIHJvdXRlc1wiIG5hdmJhcj5cblx0XHRcdFx0XHRcdFx0XHQ8TmF2SXRlbT5cblx0XHRcdFx0XHRcdFx0XHRcdDxMaW5rIHRvPVwiL1wiIG9uQ2xpY2s9e3RoaXMuY2xvc2VOYXZiYXJ9PkFydGljbGVzPC9MaW5rPlxuXHRcdFx0XHRcdFx0XHRcdDwvTmF2SXRlbT5cblx0XHRcdFx0XHRcdFx0XHQ8TmF2SXRlbT5cblx0XHRcdFx0XHRcdFx0XHRcdDxMaW5rIHRvPVwiL2FydGljbGVzL25ld1wiIG9uQ2xpY2s9e3RoaXMuY2xvc2VOYXZiYXJ9Pk5ldyBBcnRpY2xlPC9MaW5rPlxuXHRcdFx0XHRcdFx0XHRcdDwvTmF2SXRlbT5cblx0XHRcdFx0XHRcdFx0PC9OYXY+XG5cdFx0XHRcdFx0XHQ8L0NvbGxhcHNlPlxuXHRcdFx0XHRcdDwvTmF2YmFyPlxuXHRcdFx0XHQ8L3NlY3Rpb24+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhlYWRlcjsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBTUE7Ozs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQURBO0FBUEE7QUFVQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBREE7QUFHQTs7O0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQVFBOzs7O0FBNURBO0FBQ0E7QUE4REEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/js/components/Header.jsx\n");

/***/ }),

/***/ "./src/js/components/Main.jsx":
/*!************************************!*\
  !*** ./src/js/components/Main.jsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _FormContainer_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormContainer.jsx */ \"./src/js/components/FormContainer.jsx\");\n/* harmony import */ var _ArticlesList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ArticlesList */ \"./src/js/components/ArticlesList.jsx\");\n/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ \"./node_modules/@fortawesome/react-fontawesome/index.es.js\");\n/* harmony import */ var _FontAwesomeLibrary__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FontAwesomeLibrary */ \"./src/js/components/FontAwesomeLibrary.jsx\");\n/* harmony import */ var _Article__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Article */ \"./src/js/components/Article.jsx\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\n\n\n\nvar Main =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(Main, _Component);\n\n  function Main() {\n    _classCallCheck(this, Main);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(Main).apply(this, arguments));\n  }\n\n  _createClass(Main, [{\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"section\", {\n        className: \"container\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Article__WEBPACK_IMPORTED_MODULE_5__[\"default\"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ArticlesList__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null));\n    }\n  }]);\n\n  return Main;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Main);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvY29tcG9uZW50cy9NYWluLmpzeC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL01haW4uanN4PzY5YzIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBGb3JtQ29udGFpbmVyIGZyb20gXCIuL0Zvcm1Db250YWluZXIuanN4XCI7XG5pbXBvcnQgQXJ0aWNsZXNMaXN0IGZyb20gJy4vQXJ0aWNsZXNMaXN0JztcbmltcG9ydCB7IEZvbnRBd2Vzb21lSWNvbiB9IGZyb20gJ0Bmb3J0YXdlc29tZS9yZWFjdC1mb250YXdlc29tZSc7XG5pbXBvcnQgbGlicmFyeSBmcm9tICcuL0ZvbnRBd2Vzb21lTGlicmFyeSc7XG5pbXBvcnQgQXJ0aWNsZSBmcm9tICcuL0FydGljbGUnO1xuXG5jbGFzcyBNYWluIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8c2VjdGlvbiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cblx0XHRcdFx0ey8qPEZvcm1Db250YWluZXIgdGV4dD1cIk9sYWxhIEJlYmVcIiAvPiovfVxuXHRcdFx0XHQ8QXJ0aWNsZSAvPlxuXHRcdFx0XHQ8QXJ0aWNsZXNMaXN0IC8+XG5cdFx0XHQ8L3NlY3Rpb24+XG5cdFx0KTtcblx0fVxufVxuXG5leHBvcnQgIGRlZmF1bHQgTWFpbjsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBTUE7Ozs7QUFUQTtBQUNBO0FBV0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/js/components/Main.jsx\n");

/***/ }),

/***/ "./src/js/components/Root.jsx":
/*!************************************!*\
  !*** ./src/js/components/Root.jsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../scss/index.scss */ \"./src/scss/index.scss\");\n/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_scss_index_scss__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./App */ \"./src/js/components/App.jsx\");\n\n\n\n\n\n\n\nvar Root = function Root(_ref) {\n  var store = _ref.store;\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_2__[\"Provider\"], {\n    store: store\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"BrowserRouter\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"Route\"], {\n    exact: true,\n    path: \"/\",\n    component: _App__WEBPACK_IMPORTED_MODULE_5__[\"default\"]\n  })));\n};\n\nRoot.propTypes = {\n  store: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Root);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvY29tcG9uZW50cy9Sb290LmpzeC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL1Jvb3QuanN4P2EwODYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IEJyb3dzZXJSb3V0ZXIgYXMgUm91dGVyLCBSb3V0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5pbXBvcnQgJy4uLy4uL3Njc3MvaW5kZXguc2Nzcyc7XG5cbmltcG9ydCBBcHAgZnJvbSAnLi9BcHAnO1xuXG5jb25zdCBSb290ID0gKHsgc3RvcmUgfSkgPT4gKFxuXHQ8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cblx0XHQ8Um91dGVyPlxuXHRcdFx0PFJvdXRlIGV4YWN0IHBhdGg9XCIvXCIgY29tcG9uZW50PXtBcHB9IC8+XG5cdFx0PC9Sb3V0ZXI+XG5cdDwvUHJvdmlkZXI+XG4pO1xuXG5Sb290LnByb3BUeXBlcyA9IHtcblx0c3RvcmU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUm9vdDsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFIQTtBQUNBO0FBT0E7QUFDQTtBQURBO0FBSUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/js/components/Root.jsx\n");

/***/ }),

/***/ "./src/js/components/UpToTop.jsx":
/*!***************************************!*\
  !*** ./src/js/components/UpToTop.jsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ \"./node_modules/@fortawesome/react-fontawesome/index.es.js\");\n/* harmony import */ var _FontAwesomeLibrary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FontAwesomeLibrary */ \"./src/js/components/FontAwesomeLibrary.jsx\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\n\n\n\n\nvar UpTopTop =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(UpTopTop, _Component);\n\n  function UpTopTop(props) {\n    var _this;\n\n    _classCallCheck(this, UpTopTop);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(UpTopTop).call(this, props));\n    _this.state = {\n      scrollTop: 0\n    };\n    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));\n    _this.handleScroll = _this.handleScroll.bind(_assertThisInitialized(_assertThisInitialized(_this)));\n    return _this;\n  }\n\n  _createClass(UpTopTop, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      window.addEventListener('scroll', this.handleScroll);\n    }\n  }, {\n    key: \"componentWillUnmount\",\n    value: function componentWillUnmount() {\n      window.addEventListener('scroll', this.handleScroll);\n    }\n  }, {\n    key: \"handleScroll\",\n    value: function handleScroll() {\n      var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;\n      this.setState({\n        scrollTop: scrollTop\n      });\n    }\n  }, {\n    key: \"handleClick\",\n    value: function handleClick() {\n      window.scrollTo({\n        top: 0,\n        behavior: \"smooth\"\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: this.state.scrollTop > 200 ? \"center noPrint upToTop\" : \"center noPrint hide upToTop\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n        onClick: this.handleClick,\n        className: \"up\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__[\"FontAwesomeIcon\"], {\n        icon: \"chevron-up\"\n      })));\n    }\n  }]);\n\n  return UpTopTop;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (UpTopTop);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvY29tcG9uZW50cy9VcFRvVG9wLmpzeC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL1VwVG9Ub3AuanN4P2VmZjEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEZvbnRBd2Vzb21lSWNvbiB9IGZyb20gJ0Bmb3J0YXdlc29tZS9yZWFjdC1mb250YXdlc29tZSc7XG5pbXBvcnQgbGlicmFyeSBmcm9tICcuL0ZvbnRBd2Vzb21lTGlicmFyeSc7XG5cbmNsYXNzIFVwVG9wVG9wIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHR0aGlzLnN0YXRlID0ge1xuXHRcdFx0c2Nyb2xsVG9wOiAwXG5cdFx0fTtcblxuXHRcdHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5oYW5kbGVTY3JvbGwgPSB0aGlzLmhhbmRsZVNjcm9sbC5iaW5kKHRoaXMpO1xuXHR9XG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmhhbmRsZVNjcm9sbCk7XG5cdH1cblx0Y29tcG9uZW50V2lsbFVubW91bnQoKSB7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGFuZGxlU2Nyb2xsKTtcblx0fVxuXHRoYW5kbGVTY3JvbGwoKSB7XG5cdFx0Y29uc3Qgc2Nyb2xsVG9wID0gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcblx0XHR0aGlzLnNldFN0YXRlKHtzY3JvbGxUb3A6IHNjcm9sbFRvcH0pO1xuXHR9XG5cblx0aGFuZGxlQ2xpY2soKSB7XG5cdFx0d2luZG93LnNjcm9sbFRvKHtcblx0XHRcdHRvcDogMCxcblx0XHRcdGJlaGF2aW9yOiBcInNtb290aFwiXG5cdFx0fSk7XG5cdH07XG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e3RoaXMuc3RhdGUuc2Nyb2xsVG9wID4gMjAwID8gXCJjZW50ZXIgbm9QcmludCB1cFRvVG9wXCIgOiBcImNlbnRlciBub1ByaW50IGhpZGUgdXBUb1RvcFwifT5cblx0XHRcdFx0PGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfSBjbGFzc05hbWU9XCJ1cFwiPjxGb250QXdlc29tZUljb24gaWNvbj1cImNoZXZyb24tdXBcIi8+PC9idXR0b24+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFVwVG9wVG9wOyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7QUFSQTtBQVNBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7Ozs7QUFsQ0E7QUFDQTtBQW9DQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/js/components/UpToTop.jsx\n");

/***/ }),

/***/ "./src/js/reducers/articleReducer.js":
/*!*******************************************!*\
  !*** ./src/js/reducers/articleReducer.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/actionTypes */ \"./src/js/actions/actionTypes.js\");\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\nvar initialState = {\n  articles: [],\n  loading: false,\n  error: null\n};\n\nfunction articles() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (action.type) {\n    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"default\"].FETCH_ALL_ARTICLES_BEGIN:\n      return _objectSpread({}, state, {\n        loading: true,\n        error: null\n      });\n\n    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"default\"].FETCH_ALL_ARTICLES_SUCCESS:\n      return _objectSpread({}, state, {\n        loading: false,\n        articles: action.payload.articles,\n        error: null\n      });\n\n    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"default\"].FETCH_ALL_ARTICLES_FAILURE:\n      return _objectSpread({}, state, {\n        loading: false,\n        error: action.payload.error\n      });\n\n    default:\n      return state;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (articles);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvcmVkdWNlcnMvYXJ0aWNsZVJlZHVjZXIuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvcmVkdWNlcnMvYXJ0aWNsZVJlZHVjZXIuanM/M2UxZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYWN0aW9uVHlwZXMgZnJvbSAnLi4vYWN0aW9ucy9hY3Rpb25UeXBlcyc7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcblx0YXJ0aWNsZXM6IFtdLFxuXHRsb2FkaW5nOiBmYWxzZSxcblx0ZXJyb3I6IG51bGxcbn07XG5cbmZ1bmN0aW9uIGFydGljbGVzKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcblx0c3dpdGNoKGFjdGlvbi50eXBlKSB7XG5cdFx0Y2FzZSBhY3Rpb25UeXBlcy5GRVRDSF9BTExfQVJUSUNMRVNfQkVHSU46XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHQuLi5zdGF0ZSxcblx0XHRcdFx0bG9hZGluZzogdHJ1ZSxcblx0XHRcdFx0ZXJyb3I6IG51bGxcblx0XHRcdH07XG5cblx0XHRjYXNlIGFjdGlvblR5cGVzLkZFVENIX0FMTF9BUlRJQ0xFU19TVUNDRVNTOlxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Li4uc3RhdGUsXG5cdFx0XHRcdGxvYWRpbmc6IGZhbHNlLFxuXHRcdFx0XHRhcnRpY2xlczogYWN0aW9uLnBheWxvYWQuYXJ0aWNsZXMsXG5cdFx0XHRcdGVycm9yOiBudWxsXG5cdFx0XHR9O1xuXG5cdFx0Y2FzZSBhY3Rpb25UeXBlcy5GRVRDSF9BTExfQVJUSUNMRVNfRkFJTFVSRTpcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdC4uLnN0YXRlLFxuXHRcdFx0XHRsb2FkaW5nOiBmYWxzZSxcblx0XHRcdFx0ZXJyb3I6IGFjdGlvbi5wYXlsb2FkLmVycm9yXG5cdFx0XHR9O1xuXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiBzdGF0ZTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBhcnRpY2xlcztcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFIQTtBQUNBO0FBS0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUpBO0FBQ0E7QUFNQTtBQUNBO0FBRUE7QUFDQTtBQUhBO0FBQ0E7QUFLQTtBQUNBO0FBeEJBO0FBMEJBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/js/reducers/articleReducer.js\n");

/***/ }),

/***/ "./src/js/reducers/index.js":
/*!**********************************!*\
  !*** ./src/js/reducers/index.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n/* harmony import */ var _articleReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./articleReducer */ \"./src/js/reducers/articleReducer.js\");\n\n\n/*function articles(state = [], action) {\n\tswitch (action.type) {\n\t\tcase actionTypes.CREATE_ARTICLE:\n\t\t\treturn [\n\t\t\t\t...state,\n\t\t\t\t{\n\t\t\t\t\ttitle: action.title,\n\t\t\t\t\tcontent: action.content,\n\t\t\t\t\tcategories: action.categories\n\t\t\t\t}\n\t\t\t];\n\t\tcase actionTypes.DELETE_ARTICLE:\n\t\t\treturn ([\n\t\t\t\t\t...(state.articles.filter(article => article.id !== action.payload))\n\t\t\t\t]);\n\t\tcase actionTypes.GET_ARTICLE:\n\t\t\treturn (\n\t\t\t\tstate.articles.filter(article => article.id === action.payload)\n\t\t\t);\n\t\tdefault:\n\t\t\treturn state\n\t}\n}*/\n\nvar rootReducer = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"combineReducers\"])({\n  articles: _articleReducer__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (rootReducer);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvcmVkdWNlcnMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvcmVkdWNlcnMvaW5kZXguanM/N2ZlNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgYXJ0aWNsZXMgZnJvbSAnLi9hcnRpY2xlUmVkdWNlcic7XG5cbi8qZnVuY3Rpb24gYXJ0aWNsZXMoc3RhdGUgPSBbXSwgYWN0aW9uKSB7XG5cdHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcblx0XHRjYXNlIGFjdGlvblR5cGVzLkNSRUFURV9BUlRJQ0xFOlxuXHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0Li4uc3RhdGUsXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aXRsZTogYWN0aW9uLnRpdGxlLFxuXHRcdFx0XHRcdGNvbnRlbnQ6IGFjdGlvbi5jb250ZW50LFxuXHRcdFx0XHRcdGNhdGVnb3JpZXM6IGFjdGlvbi5jYXRlZ29yaWVzXG5cdFx0XHRcdH1cblx0XHRcdF07XG5cdFx0Y2FzZSBhY3Rpb25UeXBlcy5ERUxFVEVfQVJUSUNMRTpcblx0XHRcdHJldHVybiAoW1xuXHRcdFx0XHRcdC4uLihzdGF0ZS5hcnRpY2xlcy5maWx0ZXIoYXJ0aWNsZSA9PiBhcnRpY2xlLmlkICE9PSBhY3Rpb24ucGF5bG9hZCkpXG5cdFx0XHRcdF0pO1xuXHRcdGNhc2UgYWN0aW9uVHlwZXMuR0VUX0FSVElDTEU6XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRzdGF0ZS5hcnRpY2xlcy5maWx0ZXIoYXJ0aWNsZSA9PiBhcnRpY2xlLmlkID09PSBhY3Rpb24ucGF5bG9hZClcblx0XHRcdCk7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiBzdGF0ZVxuXHR9XG59Ki9cblxuY29uc3Qgcm9vdFJlZHVjZXIgPSBjb21iaW5lUmVkdWNlcnMoe1xuXHRhcnRpY2xlc1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvb3RSZWR1Y2VyOyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkE7QUFDQTtBQURBO0FBSUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/js/reducers/index.js\n");

/***/ }),

/***/ "./src/js/store/index.js":
/*!*******************************!*\
  !*** ./src/js/store/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-devtools-extension */ \"./node_modules/redux-devtools-extension/index.js\");\n/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_devtools_extension__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-thunk */ \"./node_modules/redux-thunk/es/index.js\");\n/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux-logger */ \"./node_modules/redux-logger/dist/redux-logger.js\");\n/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(redux_logger__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _reducers_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../reducers/index */ \"./src/js/reducers/index.js\");\n\n\n\n\n\nvar loggerMiddleware = Object(redux_logger__WEBPACK_IMPORTED_MODULE_3__[\"createLogger\"])();\nvar middleware = [redux_thunk__WEBPACK_IMPORTED_MODULE_2__[\"default\"], loggerMiddleware];\nvar store = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"createStore\"])(_reducers_index__WEBPACK_IMPORTED_MODULE_4__[\"default\"], Object(redux_devtools_extension__WEBPACK_IMPORTED_MODULE_1__[\"composeWithDevTools\"])(redux__WEBPACK_IMPORTED_MODULE_0__[\"applyMiddleware\"].apply(void 0, middleware)));\n/* harmony default export */ __webpack_exports__[\"default\"] = (store);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvc3RvcmUvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvc3RvcmUvaW5kZXguanM/YTNhMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgY29tcG9zZVdpdGhEZXZUb29scyB9IGZyb20gJ3JlZHV4LWRldnRvb2xzLWV4dGVuc2lvbic7XG5pbXBvcnQgdGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnO1xuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSAncmVkdXgtbG9nZ2VyJztcbmltcG9ydCByb290UmVkdWNlciBmcm9tICcuLi9yZWR1Y2Vycy9pbmRleCc7XG5cbmNvbnN0IGxvZ2dlck1pZGRsZXdhcmUgPSBjcmVhdGVMb2dnZXIoKTtcblxuY29uc3QgbWlkZGxld2FyZSA9IFt0aHVuaywgbG9nZ2VyTWlkZGxld2FyZV07XG5cbmNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUoXG5cdHJvb3RSZWR1Y2VyLFxuXHRjb21wb3NlV2l0aERldlRvb2xzKGFwcGx5TWlkZGxld2FyZSguLi5taWRkbGV3YXJlKSlcbik7XG5cbmV4cG9ydCBkZWZhdWx0IHN0b3JlO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUtBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/store/index.js\n");

/***/ }),

/***/ "./src/scss/index.scss":
/*!*****************************!*\
  !*** ./src/scss/index.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n    if(true) {\n      // 1549895043057\n      var cssReload = __webpack_require__(/*! ../../node_modules/css-hot-loader/hotModuleReplacement.js */ \"./node_modules/css-hot-loader/hotModuleReplacement.js\")(module.i, {\"fileMap\":\"{fileName}\"});\n      module.hot.dispose(cssReload);\n      module.hot.accept(undefined, cssReload);;\n    }\n  //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2Nzcy9pbmRleC5zY3NzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL3Njc3MvaW5kZXguc2Nzcz9mMDk0Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE1NDk4OTUwNDMwNTdcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtaG90LWxvYWRlci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImZpbGVNYXBcIjpcIntmaWxlTmFtZX1cIn0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7O1xuICAgIH1cbiAgIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/scss/index.scss\n");

/***/ })

/******/ });