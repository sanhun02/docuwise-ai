<div className="flex flex-col py-4 justify-start h-full bg-transparent text-zinc-400 rounded-none overflow-y-auto">
                    <div
                        onClick={() => setActiveTab("first-doc")}
                        className={`capitalize flex justify-between text-sm gap-2 px-2 py-3 w-full cursor-pointer ${
                            activeTab === "first-doc"
                                ? "text-zinc-600 bg-zinc-100 rounded-xl"
                                : ""
                        }`}
                    >
                        <p className="overflow-hidden text-nowrap">
                            This is a file
                        </p>
                        {activeTab == "first-doc" && (
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Ellipsis className="w-5 h-5" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Options</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem className="flex flex-col">
                                        <p>Rename</p>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <p>Delete</p>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                    <div
                        onClick={() => setActiveTab("second-doc")}
                        className={`capitalize flex justify-between text-sm gap-2 px-2 py-3 w-full cursor-pointer ${
                            activeTab === "second-doc"
                                ? "text-zinc-600 bg-zinc-100 rounded-xl"
                                : ""
                        }`}
                    >
                        <p className="overflow-hidden text-nowrap">
                            This is a file
                        </p>
                        {activeTab == "second-doc" && (
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Ellipsis className="w-5 h-5" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Options</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem className="flex flex-col">
                                        <p>Rename</p>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <p>Delete</p>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>
            </TabsContent>
            <div className="flex-1 p-4">
                {activeTab === "first-doc" && (
                    <div>
                        <div className="flex items-center justify-between gap-5">
                            <p className="text-2xl font-semibold">
                                First Document
                            </p>
                        </div>
                        <div className="w-full text-left">
                            <Button className="w-full text-zinc-600 bg-transparent text-left">
                                This is the content of the first document.
                            </Button>
                        </div>
                    </div>
                )}
                {activeTab === "second-doc" && (
                    <div>
                        <div className="flex items-center justify-between gap-5">
                            <p className="text-2xl font-semibold">
                                Second Document
                            </p>
                        </div>
                        <div className="w-full text-left">
                            <Button className="w-full text-zinc-600 bg-transparent text-left">
                                This is the content of the second document.
                            </Button>
                        </div>
                    </div>
                )}
                {activeTab === "third-doc" && (
                    <div>
                        <div className="flex items-center justify-between gap-5">
                            <p className="text-2xl font-semibold">
                                Third Document
                            </p>
                        </div>
                        <div className="w-full text-left">
                            <Button className="w-full text-zinc-600 bg-transparent text-left">
                                This is the content of the third document.
                            </Button>
                        </div>
                    </div>
                )}
            </div>