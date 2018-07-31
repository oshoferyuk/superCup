import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
import { FpRequestOptions } from '../../transfer-module/fp-request-options';
import { imageUploader } from './image-uploader.constans';
import { ProgressSpinnerService } from '../../progress-spinner/progress-spinner.service';

interface FormData {
    concurrency: number;
    autoUpload: boolean;
    verbose: boolean;
}

const UPLOAD_OUTPUT_TYPES = {
    ADDED_TO_QUEUE: 'addedToQueue',
    ALL_ADDED_TO_QUEUE: 'allAddedToQueue',
    UPLOADING: 'uploading',
    DONE: 'done',
    START: 'start',
    CANCELLED: 'cancelled',
    DRAG_OVER: 'dragOver',
    DRAG_OUT: 'dragOut',
    DROP: 'drop',
    REMOVED: 'removed',
    REMOVED_ALL: 'removedAll'
};

@Component({
    selector: 'fp-image-uploader',
    templateUrl: './image-uploader.component.html',
    styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent implements OnInit {

    @Output() imageUploaded: EventEmitter<string> = new EventEmitter<string>();
    @Output() imageMaxSizeExceed: EventEmitter<any> = new EventEmitter();

    formData: FormData;
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput> = new EventEmitter<UploadInput>();
    humanizeBytes: Function;
    dragOver: boolean;

    constructor(private progressSpinnerService: ProgressSpinnerService) {
    }

    ngOnInit(): void {
        this.formData = {
            concurrency: 1,
            autoUpload: false,
            verbose: true
        };

        this.files = [];
        this.humanizeBytes = humanizeBytes;
    }

    onUploadOutput(output: UploadOutput): void {

        const fileIsPresent = typeof output.file !== 'undefined';

        if (fileIsPresent && output.file.size > imageUploader.maxSize) {
            this.imageMaxSizeExceed.emit();
            return;
        }

        switch (output.type) {
            case UPLOAD_OUTPUT_TYPES.ALL_ADDED_TO_QUEUE: {
                this.startUpload();
                break;
            }
            case UPLOAD_OUTPUT_TYPES.ADDED_TO_QUEUE: {
                if (fileIsPresent) {
                    this.files.push(output.file);
                }
                break;
            }
            case UPLOAD_OUTPUT_TYPES.UPLOADING: {
                if (fileIsPresent) {
                    // update current data in files array for uploading file
                    const index = this.files.findIndex(file => fileIsPresent && file.id === output.file.id);
                    this.files[index] = output.file;
                }
                break;
            }
            case UPLOAD_OUTPUT_TYPES.REMOVED: {
                // remove file from array when removed
                this.files = this.files.filter((file: UploadFile) => file !== output.file);
                break;
            }
            case UPLOAD_OUTPUT_TYPES.DONE: {
                this.imageUploaded.emit(output.file.response.url);
                this.progressSpinnerService.hide();
            }
        }
    }

    startUpload(): void {
        this.progressSpinnerService.show();

        const event: UploadInput = {
            type: 'uploadAll',
            url: FpRequestOptions.resolveApiUrl('/offer/pictures'),
            method: 'POST',
            concurrency: this.formData.concurrency
        };

        this.uploadInput.emit(event);
    }

}
