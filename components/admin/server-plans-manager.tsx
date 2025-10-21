"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Pencil, Trash2, Plus, Save, X, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"

interface ServerPlan {
  id: string
  name: string
  nameRu: string
  cpu: number
  ram: number
  storage: number
  bandwidth: number
  price: number
  popular: boolean
  description: string | null
}

export function ServerPlansManager() {
  const [plans, setPlans] = useState<ServerPlan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingPlan, setEditingPlan] = useState<ServerPlan | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    loadPlans()
  }, [])

  const loadPlans = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/server-plans")
      if (response.ok) {
        const data = await response.json()
        setPlans(data)
      }
    } catch (error) {
      console.error("[v0] Error loading plans:", error)
    }
    setIsLoading(false)
  }

  const handleEdit = (plan: ServerPlan) => {
    setEditingPlan({ ...plan })
    setIsDialogOpen(true)
  }

  const handleCreate = () => {
    setEditingPlan({
      id: "",
      name: "",
      nameRu: "",
      cpu: 2,
      ram: 4,
      storage: 50,
      bandwidth: 1000,
      price: 500,
      popular: false,
      description: null,
    })
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    if (!editingPlan) return

    setIsSaving(true)

    try {
      if (editingPlan.id) {
        // Update existing plan
        const response = await fetch(`/api/server-plans/${editingPlan.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingPlan),
        })

        if (!response.ok) throw new Error("Failed to update plan")
      } else {
        // Create new plan
        const response = await fetch("/api/server-plans", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingPlan),
        })

        if (!response.ok) throw new Error("Failed to create plan")
      }

      await loadPlans()
      setIsDialogOpen(false)
      setEditingPlan(null)
    } catch (error) {
      console.error("[v0] Error saving plan:", error)
      alert("Ошибка при сохранении плана")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить этот тариф?")) return

    try {
      const response = await fetch(`/api/server-plans/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete plan")

      await loadPlans()
    } catch (error) {
      console.error("[v0] Error deleting plan:", error)
      alert("Ошибка при удалении плана")
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={handleCreate} className="gap-2 bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4" />
          Добавить тариф
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className="p-6 card-gradient border-border/50">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-foreground">{plan.nameRu}</h3>
                <p className="text-sm text-muted-foreground">{plan.name}</p>
              </div>
              <div className="flex gap-2">
                {plan.popular && (
                  <Badge variant="default" className="bg-primary">
                    Популярный
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">CPU:</span>
                <span className="text-foreground font-medium">{plan.cpu} ядер</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">RAM:</span>
                <span className="text-foreground font-medium">{plan.ram} GB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Storage:</span>
                <span className="text-foreground font-medium">{plan.storage} GB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Bandwidth:</span>
                <span className="text-foreground font-medium">{plan.bandwidth} GB</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-3xl font-bold text-primary">{plan.price.toFixed(2)} ₽</div>
              <div className="text-sm text-muted-foreground">в месяц</div>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => handleEdit(plan)} variant="outline" className="flex-1 gap-2">
                <Pencil className="w-4 h-4" />
                Редактировать
              </Button>
              <Button onClick={() => handleDelete(plan.id)} variant="outline" size="icon" className="text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPlan?.id ? "Редактировать тариф" : "Создать тариф"}</DialogTitle>
          </DialogHeader>

          {editingPlan && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Название (EN)</Label>
                  <Input
                    id="name"
                    value={editingPlan.name}
                    onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                    placeholder="Professional"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nameRu">Название (RU)</Label>
                  <Input
                    id="nameRu"
                    value={editingPlan.nameRu}
                    onChange={(e) => setEditingPlan({ ...editingPlan, nameRu: e.target.value })}
                    placeholder="Профессиональный"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cpu">CPU (ядра)</Label>
                  <Input
                    id="cpu"
                    type="number"
                    min="1"
                    value={editingPlan.cpu}
                    onChange={(e) => setEditingPlan({ ...editingPlan, cpu: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ram">RAM (GB)</Label>
                  <Input
                    id="ram"
                    type="number"
                    min="1"
                    value={editingPlan.ram}
                    onChange={(e) => setEditingPlan({ ...editingPlan, ram: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storage">Storage (GB)</Label>
                  <Input
                    id="storage"
                    type="number"
                    min="1"
                    value={editingPlan.storage}
                    onChange={(e) => setEditingPlan({ ...editingPlan, storage: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bandwidth">Bandwidth (GB)</Label>
                  <Input
                    id="bandwidth"
                    type="number"
                    min="1"
                    value={editingPlan.bandwidth}
                    onChange={(e) => setEditingPlan({ ...editingPlan, bandwidth: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Цена (₽/месяц)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={editingPlan.price}
                  onChange={(e) => setEditingPlan({ ...editingPlan, price: Number.parseFloat(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Описание</Label>
                <Input
                  id="description"
                  value={editingPlan.description || ""}
                  onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                  placeholder="Описание тарифа"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="popular">Популярный тариф</Label>
                <Switch
                  id="popular"
                  checked={editingPlan.popular}
                  onCheckedChange={(checked) => setEditingPlan({ ...editingPlan, popular: checked })}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave} disabled={isSaving} className="flex-1 gap-2">
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Сохранение...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Сохранить
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => {
                    setIsDialogOpen(false)
                    setEditingPlan(null)
                  }}
                  variant="outline"
                  disabled={isSaving}
                  className="gap-2"
                >
                  <X className="w-4 h-4" />
                  Отмена
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
