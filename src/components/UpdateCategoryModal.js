/* This example requires Tailwind CSS v2.0+ */
import React from 'react';
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/outline'
import { Formik } from 'formik';
import { XIcon } from '@heroicons/react/solid';
import MainService from '../services/main.service';

export default function UpdateCategoryModal({openModal, toggleOpenModal, data, toggleRefetch}) {

  console.log(openModal)

  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => {toggleOpenModal()}}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
             <h1
             className="font-bold text-center mb-4 text-gray-500"
              >MODIFIER LA CATÉGORIE</h1>
              <XIcon className="absolute top-3 right-3 h-7 w-7 py-1 px-1 rounded-full bg-red-500 text-white hover:bg-red-700 hover:cursor-pointer" 
                onClick={() => toggleOpenModal()}
              />
              <Formik
                initialValues={{ 
                  name: data.name,
                  description: data.description,
                 }}
                onSubmit={(values, actions) => {
                  MainService.updateCategorie(data._id, values)
                  .then(res => {
                    console.log(res)
                    toggleOpenModal()
                    toggleRefetch()
                  })
                  .catch(err => {
                    console.log(err)
                  })
                }}
              >
            {props => (
              <form onSubmit={props.handleSubmit}>
                <input
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.name}
                  name="name"
                  className="py-3 px-4 border rounded-md w-full border-gray-400 mb-2 focus:border-gray-500"
                  placeholder='Nom'
                />
                {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                
                <textarea
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.description}
                  name="description"
                  className="py-3 px-4 border rounded-md w-full border-gray-400 mb-2 h-24 focus:border-gray-500"
                  placeholder="Description"
                />
                {props.errors.description && <div id="feedback">{props.errors.description}</div>}
                <button type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white rounded-md mt-2 py-3"
                >MODIFIER</button>
              </form>
            )}
          </Formik>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}