"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useStore } from "@/lib/store"

export function AddPatientDialog() {
  const addPatient = useStore((state) => state.addPatient)
  const [open, setOpen] = useState(false)
  const [conditions, setConditions] = useState<string[]>([])
  const [allergies, setAllergies] = useState<string[]>([])
  const [newCondition, setNewCondition] = useState("")
  const [newAllergy, setNewAllergy] = useState("")

  const addCondition = () => {
    if (newCondition && !conditions.includes(newCondition)) {
      setConditions([...conditions, newCondition])
      setNewCondition("")
    }
  }

  const addAllergy = () => {
    if (newAllergy && !allergies.includes(newAllergy)) {
      setAllergies([...allergies, newAllergy])
      setNewAllergy("")
    }
  }

  const removeCondition = (condition: string) => {
    setConditions(conditions.filter(c => c !== condition))
  }

  const removeAllergy = (allergy: string) => {
    setAllergies(allergies.filter(a => a !== allergy))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const patient = {
      id: crypto.randomUUID(),
      name: `${formData.get('firstName')} ${formData.get('lastName')}`,
      age: Number(formData.get('age')),
      gender: formData.get('gender') as string,
      bloodType: formData.get('bloodType') as string,
      conditions,
      allergies,
      phone: formData.get('phone') as string,
      emergencyContact: {
        name: formData.get('emergencyName') as string,
        phone: formData.get('emergencyPhone') as string,
        relationship: formData.get('relationship') as string,
      }
    }

    addPatient(patient)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Patient
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
          <DialogDescription>
            Enter the patient's information to create their medical portfolio.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[600px] pr-4">
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" placeholder="Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" name="age" type="number" placeholder="45" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select name="gender" required>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Blood Type</Label>
                  <Select name="bloodType" required>
                    <SelectTrigger id="bloodType">
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" required />
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Medical Conditions</h3>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add condition"
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addCondition()
                      }
                    }}
                  />
                  <Button type="button" onClick={addCondition}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {conditions.map((condition) => (
                    <Badge
                      key={condition}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => removeCondition(condition)}
                    >
                      {condition} ×
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Allergies</h3>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add allergy"
                    value={newAllergy}
                    onChange={(e) => setNewAllergy(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addAllergy()
                      }
                    }}
                  />
                  <Button type="button" onClick={addAllergy}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {allergies.map((allergy) => (
                    <Badge
                      key={allergy}
                      variant="destructive"
                      className="cursor-pointer"
                      onClick={() => removeAllergy(allergy)}
                    >
                      {allergy} ×
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Emergency Contact</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="emergencyName">Contact Name</Label>
                  <Input id="emergencyName" name="emergencyName" placeholder="Jane Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Contact Phone</Label>
                  <Input id="emergencyPhone" name="emergencyPhone" type="tel" placeholder="+1 (555) 000-0000" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship</Label>
                  <Input id="relationship" name="relationship" placeholder="Spouse" required />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Patient</Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

