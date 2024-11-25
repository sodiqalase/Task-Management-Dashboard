<script setup lang="ts">
import Button from "../../../components/Button.vue";
import SideModal from "../../../components/modal/SideModal.vue";
import Priority from "../../../components/Priority.vue";
import Status from "../../../components/Status.vue";
import { ITask } from "../../../interface/task.interface";
import { formatDate } from "../../../utils/date.util";

interface Props {
    onClose: () => void;
    data: ITask|null
}

const { onClose,data } = defineProps<Props>();

const {title, description,due_date,status='Pending',priority='Low'}=data||{}
</script>

<template>
    <SideModal :onClose="onClose">
        <template #body>
            <section className="grid h-auto grid-cols-2 gap-4">
                <div>
                    <h6 className="text-dbGray text-sm">Title</h6>
                    <p className="text-blueGray font-medium break-words mt-1">
                       {{title||""}}
                    </p>
                </div>
                <div>
                    <h6 className="text-dbGray text-sm">Due Date</h6>
                    <p className="text-blueGray font-medium font-medium break-words mt-1">
                       {{due_date?formatDate(due_date):"N/A"}}
                    </p>
                </div>
                <div>
                    <h6 className="text-dbGray text-sm">Status</h6>
                    <p className="text-blueGray font-medium break-words mt-1">
                       <Status :status="status"/>
                    </p>
                </div>
                <div>
                    <h6 className="text-dbGray text-sm">Priority</h6>
                    <p className="text-blueGray font-medium break-words mt-1">
                       <Priority :priority="priority"/>
                    </p>
                </div>
                <div class="col-span-2">
                    <h6 className="text-dbGray text-sm">Description</h6>
                    <p className="text-blueGray font-medium break-words mt-1">
                       {{description}}
                    </p>
                </div>
               
            </section>
        </template>
        <template #footer>
            <div class="mt-3">
                <Button
                    :onClick="onClose"
                    :buttonText="'Close'"
                    :variant="'secondary'"
                />
            </div>
        </template>
    </SideModal>
</template>

<style scoped></style>
