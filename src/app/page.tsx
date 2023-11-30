'use client'
import { Fragment, useState, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon} from '@heroicons/react/20/solid'
import OpenAI from "openai";

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
]
const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]



function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [items, updateItems] = useState([{text: "Waiting on assistant"}]);


  function handleSend() {
    updateItems([...items, { text: "User: " + message }])
    sendMessage(message, [...items])
    setMessage("");
  }
  const [message, setMessage] = useState('');

  const handleMessageChange = (event: any) => {
    setMessage(event.target.value);
  };

  const [chatLog, setChatLog] = useState<any>([{ role: "system", content: "You are a sarcastic helpful assistant for a scientific researcher." }]);
  const openai = new OpenAI({apiKey: "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", dangerouslyAllowBrowser: true});

  async function setup() {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a witty, sarcastic, helpful, yet scientifically accurate assistant for a scientific researcher." }],
      model: "gpt-3.5-turbo",
    });
    
    updateItems([{text: "Assistant: " + completion.choices[0].message.content}])
    console.log(completion.choices[0]);
    setChatLog([...chatLog, completion.choices[0].message])
  }

  async function sendMessage(message:string, initialArray:any) {
    const completion = await openai.chat.completions.create({
      messages: [...chatLog, {role: "user", content: message}],
      model: "gpt-3.5-turbo",
    });
    
    updateItems([...initialArray, { text: "User: " + message }, {text: "Assistant: " + completion.choices[0].message.content}])
    console.log(completion.choices[0]);
    setChatLog([...chatLog, {role: "user", content: message}, completion.choices[0].message])
    console.log(items);
    console.log(chatLog);

  }

  useEffect(() => {
    setup();
  }, [])


  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className=''>
        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-10 w-auto"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Atom_editor_logo.svg/1200px-Atom_editor_logo.svg.png"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="mt-auto">
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    <Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="relative flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Separator */}
                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src="https://openclipart.org/image/800px/216165"
                      alt=""
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                        Dovlet H.
                      </span>
                      <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-50' : '',
                                'block px-3 py-1 text-sm leading-6 text-gray-900'
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <div className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col">
                <div className="overflow-y-auto h-96 rounded-lg bg-white shadow-lg scroll-auto">
                  <ul role="list" className="divide-y divide-gray-200">
                    {items.map((item, id) => (
                      <li key={id} className="px-6 py-4 m-2 rounded-xl bg-gray-100">
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="my-5">
                  <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
                    Your message
                  </label>
                  <div className="mt-2 " >
                    <textarea
                      rows={4}
                      name="comment"
                      id="comment"
                      value={message}
                      onChange={handleMessageChange}
                      className="block w-full rounded-md border-0  p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <button
                      onClick={handleSend}
                      type="submit"
                      className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 my-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            }</div>
          </div>
        </div>
      </div>
    </>
  )
}