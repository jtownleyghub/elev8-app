"use client"

import { useState } from "react"
import { useGoals } from "@/contexts/goal-context"
import { ContactCard } from "@/components/relationships/contact-card"
import { ContactForm } from "@/components/relationships/contact-form"
import type { Contact } from "@/types/goals"
import { Plus, ArrowLeft, Users } from "lucide-react"
import Link from "next/link"

export default function ContactsPage() {
  const { contacts, addContact, updateContact, deleteContact, generateTasksFromTemplates } = useGoals()
  const [showAddContact, setShowAddContact] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact)
    setShowAddContact(true)
  }

  const handleDeleteContact = (contactId: string) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      deleteContact(contactId)
    }
  }

  const handleSaveContact = (contactData: Omit<Contact, "id">) => {
    if (editingContact) {
      updateContact({ ...editingContact, ...contactData })
    } else {
      addContact(contactData)
      // Generate initial tasks
      setTimeout(() => {
        generateTasksFromTemplates()
      }, 500)
    }

    setShowAddContact(false)
    setEditingContact(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Link href="/life-areas/relationships" className="mr-4 p-2 hover:bg-gray-800 rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-pink-500 flex items-center justify-center mr-3">
            <Users className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Contacts</h1>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-gray-400">Manage your relationships and set up recurring engagement tasks.</p>
        <button
          onClick={() => {
            setEditingContact(null)
            setShowAddContact(true)
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg inline-flex items-center transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Contact
        </button>
      </div>

      {showAddContact && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold mb-4">{editingContact ? "Edit Contact" : "Add New Contact"}</h2>
          <ContactForm
            initialContact={editingContact || undefined}
            onSave={handleSaveContact}
            onCancel={() => {
              setShowAddContact(false)
              setEditingContact(null)
            }}
          />
        </div>
      )}

      <div className="space-y-4">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} onEdit={handleEditContact} onDelete={handleDeleteContact} />
          ))
        ) : (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 text-center">
            <p className="text-gray-400 mb-4">You don't have any contacts yet.</p>
            <button
              onClick={() => setShowAddContact(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg inline-flex items-center transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Your First Contact
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
