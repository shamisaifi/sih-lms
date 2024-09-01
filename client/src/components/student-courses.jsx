'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Award, ChevronRight } from "lucide-react"

// Mock data for courses
const courses = [
  {
    id: 1,
    title: "Introduction to React",
    thumbnail: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIWFhUWFxkYFxgYGBgfFxgbGxgeHh0fIBoaHCggGyElHxcVIT0hJSkuLi4uHR8zODMtNygtLisBCgoKDg0OGxAQGy4lICUvLS0tLS0vLS0tLS0tLS0vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKgBLAMBEQACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAwQFBgIBB//EADoQAAIBAwIGAQIFAgQGAgMAAAECAwAREgQhBQYTIjFBUTJhFCNxgZFCUhUzocEHFkNicvDR4SRUsf/EABoBAQADAQEBAAAAAAAAAAAAAAABAgMEBQb/xAA2EQACAgEDAgMGBgIBBAMAAAAAAQIRAwQSITFBE1FhFCJxgaHwBZGxwdHhMkLxFSNSYkNTov/aAAwDAQACEQMRAD8A/J24KbAiurwotHU8MSM8Dk+Kr4HqV8D1Im4RIPVR4HqR4HqU5NOymxG9Zzg4dTJwaLsXBZWF7Vxy1WNOidjI5uFSr5X+KtHUY5dyNrKkkTL5BH61spJ9Cp6ggZzZVJP2qJTjHqyaPMsTKbMCD96mMlJWiDyRUg+UAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgO54dq0IF674noGv147eqvaJtEDyR/aotEcGHrAhkHiuLXP/tujKR2fCNMhQeK+NyzluCLOp0cXu1bYpsho5vmnh0YiJAF669NlkspSS4LHI2gi6YJAJquryzeai0Yqjel4BBIHZlHs1XFklu6hpUZ3EeEaeVIEWL6j5/StPaJQUq6kbLZ41fImkEqXJCsp2B8kVb27JGFjw1ZxvEOXY0l1KGQx9FQyqwuWv6uK9bTzeSCbMJcHNVqQKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAlTUMPBq6ySRdZJIl/xCT+6reMy3jSLmgaWQ7E1pCbZtjk2rZbn4RLcMPNRlhvVMSVm/oJplTx4rypfhcZPkryjn+K8wzFit7WNIfh8MfDMpTdkOn4+3/VGQpPRx/04Cn5kx47ITbTgr81OPQ7v8+SssqiQDmXVAFeod/NaeyY07ob20fIuYdUiKBI2INwbe/1qXpMbt11HiPpZZ/5z1mSuZLlQQLgW3rN6LC1TRPiSKZ5h1BaZi9zOuMhIBuPt8V0wgoJKJR8mVVgKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoDquVZkGxrox9Dsg+EdiNRFb1WyL2ihqeJxqrWt4qrZjJn5zq5c3Zvk1zTds5mRYn4qu1kWjrOQYMncFQRbyfVbYeGcuq6G9pOEwYYPGM2ZwSfItvXSkubOCc52trKmu0KrpNO5gOKS9w3sR8mqV7rSOhTe676oyf+IEUazjpwdMFQchfF9h42ttVNQlxx8y+gk3F2/kcrXKd51a6GIcO0xIAM+qZZJMbsiqAAB7/AKi1vdQujY7pGzJyDpzPZZ2GnELymVnhIfFwna1wF3Zb5eKXwqHd2UdVwrTx6XiEadKb8O+naLULuxErbjJWKmw2293qXw/kRfBX4ppNFDoNJIql5pSzuXRlLKshVlBWYqoGNvpJPm6+KLoyeLKfHuAKmun08ckcaIGdDK9hjhmqXN7tYhQPZqfL1Bz1qgCgFAKA+UAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUBJFKy7g2qVJroWjJx6E54jL/cav4jJ8RkDzMfJNVcmyrk2fI2sQfNQnTsq1ao2hrHAF4D/B/+K6FqFXQ4no//AGK2p4pID2gxn3a4Jqk819Ea4tOo9XZTOskJvm1/1NZ75eZt4cPI9vxKYp0zK5T+3I2puY8ON3RLFxG9hOGmVRZQZGGP6VaM1/srRnPE/wD43tfws9/itN/+s37TH/dDV9+L/wAPqU8LP/8AZ/8An+yNeKyLH0UNoxKJVGxKOBYENa/i38CsXVuu50q6VvkttzZrTMs51MhkVSoYkfSfItaxB+4+KiuKJPCcyaoPNJ1btOuMuSoQ42tdWUrtYWIFx6qb5sVxRUPEXYQq9nSG+CEC1i5dgSBcgknz81DXFAtTcelaebUEIXmEga6gqBILEAHxYGwPqwqfIgy7UAtQC1QD5QkUAoD5QCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgLnByvWTPxkKrLoD9q0umjKqbLa4t4qnYh9TO1un0zMY26fUKn4t52qzsLk/POfIo11bCPHHFfpta9vtV+yIj3NPVarhh0ZVVQT9MW/Lkvlb+7K371vHZt5OieyuDP5C0sUk7iSNJGEMjQxyGyPIBsDci/vauZ9UZLoz9DXlbSmWVRo4ivW06yd5AhjfTBpGU5ejvept/Olx8xS/U5uXlqIab8Vp4sraWExyAlg2p/FYEY3IZsbDG1txtvUqra+P9EO6/I0uYuHZal21ml7IeHCZFw6QaUCLO7RhS1mZgRfa/qkbcYh0myCOODQf4qIoLmJYQjFzmEmKdl7HwT5tcjY1CfvJ+l/oH0r1/kyOaeVoYdMskSS5B4EWQm6arqw9QtGMdsWFtifI90g7VsmSp8FPljlhJmdNQswZZ4tOY47B42kZgWcMpsFxItYb+xXRixqV392cmozOH+Nd+vp2+JPr+WdJDAJXmcvYSYC/cnVKYg9IqrWF8yxF9sfdXlhSTfPcrDPKUkuO3x5VmVzhpIIdVJFp0dVQ2IZg2/wBja9rfN6yyxUXS++DTTzlOG5/fJe4dyokkUZMzLJIqSACO6BH1CwDuyByuxa1qvjwqUbZWedqTSXC/ixPyitso5yykqoyjxYsZ+idszYX7gb7+NqPCqbT+7ohal2otdf4sQ8tR2ijLEvNrm06v6WOLEM2N/LGUGx/t+9cmaXhxnLyOvH7+31J9VyxAHIRmKPo5547yIxV4SxN2QYsCIiNvBa3kVhps0si9/rfk12vuaZYKL4OMrqMxQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQH0GgOgfimvCIe4KLYkCoVUQ+pDoeCarUylfEhGXeSCf0o2CHhnANRqJHjjW5S+ZJAUW83Y1L60SulmeITnhte+PkWve3nx+9Q3XUmKcmki+V1GgnHhJVFx9DizD75KQQaiLjNWi04Sxy2s8a/jeonDiWUsHkEjXC7uq4A7Daym1ht9qsUKkWmdldlUlYwGc/2gsFBP7sB+9RfNFlFtN+R4Ln5P81Yqeuo2+5387ne3i/zQgnkeXFCxfAX6dy2Isd8b7bG3ilEKSbq+UXeD8fm07vKlmkfcu5cte977MMt9yGyBsLg1eE3F2imTEsiqRWOsnMRQySGEtuuT9PM77j6b7E1G588llCKrg9nXiTfUmaYgBUPWtio9d6Pt9ha1FL/y5KuLX+FL5f2jT0PNbwxJDHH2JIr9zu1wsokC2uEG6rdlUHz8mrLK48RKvApPdLr9/P6lT/mbV9UzCdsyMb7GyhsgLEW2be/m+9Q8km7slYMdVRXXjMwUKG8TddWt3LIRYkH1ey7f9orKaU01Lm+ptH3arsSS8xah2ld3DPLF0S1gMUyBIUKAq3tbYf1N8mqYsUMa2wVIlycnbMmtCD5QCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQHpGsQfijB+pQ8f0ohiMjrdSuw/3FZRT20S+tn3i3M2mGo0zh0Khjcre6gj39qs17vBX/Yx+FcdTSy65U1IxkjZoyt7GQkWHjzV/9kyOdlHIPAjQmYzjqmS3SxORBFy+Xjztai6ssdXHxPTnURajrRgtpREt1YmGZY8QzDG1r+xf9K4/Dl4e2uj/ADR6ni4/G3qS5X5M1uF8a0InkZpozkYVmJUrHJaO0jqOkSbttj2g7mqShlpcfd9/kaRzYbdPq+b+HYy9bxLT/gJIopYgpgjQR4/mmUagM5vjuCoB8+vtWsIS8S2n3/owyZYPDtTXbj87MDlfiGngkZtRF1FK2AwR7G/mznb9q7E0nycMJRXUq8c1MUs7vCmEZtiuIW1lAPapIG4JqZNN8FXV8HTaKOELoWmbSlUEokXKC9mQmPNVNydrEsL3tc1aNcX5/wAHnZFl/wC5SfNV+40OvjDSCM6YNLo0uGWBUMt1yW7AKlwCSuwv96KSv5F8kJXHq0pfSmfODrA8PD1lt0fxcwnHhcyI+nlb0V2v8ZVlLoztXY6NOFafaSTT6JT0tGZO5RAokmn6hVs8Semi/ST47b7VP39R9/Q5vimh0Q0bzQ9K/SiWP8wdXqfiHzJjyyB6eG5FrWtUL7/P+AzzypwWLrvDMsEziWFCDMMem2RkZGVhmwtGLC/1HatsST6nNqJSiuG+/RWT8P4LomELSFAjjTi4lGRcrIZBYsMbssaG9gL7Eea12Qt/fczyZcilS9e3woqcS0ujiGocQAsn4dVjdyAGcPmQIpmJFlU2LmxIv8GklBc19S0HklS3efNfyihzDooIooWjWzTqsoGTHBAgVhufcom8+lX5qs4xUU13LYZzlOSfRcfH7VEvB4erozGz2QayEubj8pGVlZ/sLld/sKQ5i18BlltyX3p0bum5X0rylWjKdgyjEhYxkyOFa9/BRFbc2GQ2NxXVHBjcl/P1PNya3NDE5J/B1XZWvz4XmeNFwPThdLGUusuogykYg9UGMswXbtXJsP2+ayzwjjwvb3rk6dPmnk1D3Ponx5c/uYOoRX0c8zoqudWAllA8qxdf0Hbt6vXH/s0eguxn8NOm6cvWyzx/Kx8X+9bYtnO86sTxbHv69i7yfoVmkcPHmBGT+h9V5f4hmeOCcZVyW0sFJu0ddFyxpcU7RcD+a8iWvz2+T0Fp8dHL8ycMijTJNjmR+or2tJllONyPKzxSm0jmq7DIUAoBQCgFAKAUAoBQCgFAag5f1PTEvTOJ8fO/2qE0wy/oeUJmlSOb8kSfSxFwT8bVDlSseh64JybNqdRLCpAEJYPJYkC32G5JqzdOguVZgauDCR4/JVivgi9jbwdxR8Bcl1uXtWCoOmmu/wBI6bd219tvjes/FhV2jf2bLdbWQycKnViphkDBlQgo1wzglVtbywBIHu1W3x8yngzuqZWKEEgggg2IPkGrGdGrouX5nlSJx0WkBMfWWRQ9vSkIf58feqPJGrXJosM7pqn6lKDRyOrOkbsibswViq/+RAsP3q+5J0UUJNWkWtBwSeVowI2USkhHdWEbWUk2a1jsD4qkskUrLRwzk6r7qynJEy2yUrcBhcEXB8EX9H5rS7M2muohlKsGViGUggqbEEbggjcEfPqlEF9W1WoEzGSVwFDzMzSMDgDjkd7ndgMvvUrkrKaVWQQ8KnfDGGQ9Q2Tsazm19jax23/Teg3xV8k8PCtTHJJs0MmnUysWupQKQAQfksygW8kjenKZKakr7FNeHzEKwikKsQqkI1mJ8AG25PwKjl8jfFcWRtpJBe8bC2QPadin1etsbi/x7pRKkvM0XbWPN3xu8rKABJEGOK7CyuhsBbyB81a5WZPwtr549HX6Mh1vCp+92Ve2fodoAykANwiqLG1h4H9S/NVk+XZpjacU49GQScK1C5ZQSjDd7xsMR/3bbfvUFyFopIyGIZCG2NiCGFj59EXU/uKA9mOZkBs5S5I2Yrc+SPV9v9KsoN8pFHkgntbVkX4Z7E4NYWubGwv4psl5DxIXVonh68X09RLj0GFx/vVZ4N/+Ub+RMM8f9ZL8z3DrdQfpeQ4j0SbCs1poS4UUavUSj1kfehPKO65AFxlW+PTPsqObJqYLqyE8Pk/tNJwcFbJjmhLoyGWBl+oWrJST6GlnnA/FWL7WWYNA7eBWUs0Ym8NM31Jjwl6p7RE09k9SBtEw9VdZYsp7K/Mq1qcooBQCgFAKA7/Qc4wJpkRwzutrC3gg/NZqPVBknHOeopGhePM4SB2UqABb4PurNXGiP9rMqPmPTxavUTRiUpPFItjiCHf9/A/mrPqmQlUXEwdJPCsZYq51AkVkNx08R5DDyTeqyW5NehrCW2Sl5M/Rv8b0qvGTN/mSzzOOqrBM4Ctgw2XuNgDv9q4I48lXXl9D2XnxdN3ZnPxc2abNVaObpRHTNGQU6jHThx3327uo3jxYVu8Mq4a5u/n5HLHWxTVp8dP7MWXRymQ6lVTEuZQDJHe2WQBXO/7WrdtSW05VCcZLJS8+q/kvzceh/GR6tBMfzGkkR2UgF7XCEfG+5t4UW2qixy2VwWeeG9SV9+r8/Il4ZzBBBH01WVum0rRXxAfqxYESgE+PO17+NqrLE3K/h9PImGpjCG1X3+HPmIuY4hPDqbTZoFDx3QxdkJjBUE+yQbHxdvN6PC3Fx4+3ZPtUVJS5+F8dKMfjmtWeYygEFwC4O4D2s2O57NrgHx48AVtCLiqObLNSluXcua3maaWAadgMAFF+pqT9NrdrzGP1/b+lq2U3VETyOSog4Hq4Y+r1TJ3xtGMFU/ULEnJ18WH8mqxdM58kHKvRpl08xLgi4McPwlrkW/IVw/6ZF9v3vVt3FGTwX38/r/BE3FIT+NUF8dQoKFlGQZZVkxIUnY9wvf0Kq3bs3gtsVE+RceUSQk9QRx6cwHEjIFo3Uuova4MhIvb9qnd09DOWG06q27/T+C5PzRC6vlHJfGSNPpN1eKKPJ2vfK0N9vOXnbedy+/hRgtLJNU12b+Tb4/MlHOMRcs6y7ySPkpGYDTpIqAk+LJif96b7ZWWide7Xbr06NfvZ84LzBF1dOzHFl1mokNyFASdEGWdiAyFCf4rObttnbig4QjHySRt8X5r0scUipK8zD8pLNcPholhykuBkuUkpFvJX4N6L7+pajn+ZeYtJq2S6ThQ00j7pfORECgeRiDGoJO5FRG0qJrkl0fMkK6ZAc7rhGyAjwEkBZR+rAm9t69HFqYRx89UeJm/D8s87kqp20/muH+R5n5uiKMio47h5Cm6i3k32NlqXrIU0k/oVj+E5N6lKS6evXkhh45lHO7MCztaJSe5b7fsLGkNQnub+SNJaHbPHGK4S959mUOEatdPmJP6htax/1FZYpLE3v7nTqsMtRtePsTy8ZiLAi9sbWt4rR6iDZlHR5FGiRuOxWG3gW8VjqMsZwpF9PpcmOe5mRxHWq4AA8ea4IQads9JLkgeYbAVvNpqkdfjR4SNzQ65AoFeVlwybOyOSJZfXpWawyL+IjPn1y3rojhlRG9GBXeeOKAUAoBQCgOi0nKU0mn/EBlsfC+zVVJOw+DTTkZ4WifU90TsFYIbMpbx5qHL3bJ70fOFcpQycQm0zy4xxZGxPewAvsbEfqas3yqIj0tnK8QhQTOkRyQOQhve4vtvYX/ipdIRTlSN8cjai6r1Ybs/TIzbsYRmQhu3btHq+9cy1Maun/wAnY9FNd0Vm5TmFiHiZWMIVgWxYTFgpF1BsCjA3AI+DWnjR/X6FPZJ8dOf3M9OGMdQNNdczL0r37cs8fNr2v9q03cWYbXu2m/8A8i6nJQrxPcM10MjYgKjbqI8jcSLYKCay9ojXQ6Ho5ruj0ORtT3AyQqwJGJaTI2w8fl7X6iDex33Asae0R8mR7JOrtFU8qz5RpnHk8iREZN+W7pmobt/tvuuQ2NSs8ash6WVpWutEUHADJvHPE6hgrsOoFQFXYsckHaBE+4+3zUvIl1RVYG+Yu0UOGaJp5BGpAJDG5vYYqWPj/wATV5S2q2ZQg5OkaUfLLmNnMi9sUcuIV2YiRMwLKLgAbFvFU8VbkjZaaTjusnHJ8nTjlMiqjKWkurAxAR5m6+W2Hr3b1vVfHXKon2VpXf6nzU8osiysdRFaP6bkL1LRq5tkRbZ1Hu52pHMpNJIiWmcU22jK4JweTVOUjNiFy/y5n2vbxDG7Dz5It963owjGytr9C0UrQtuytie113/8ZFVh59gUaoh8G2vKqGV4hqQcHEJPTNjKxIVR3fT2sS3r4NX2K6s4HrWoKTh1TfXsur/Tggh5ZuMmlxUKrMQhNg2m6/i+9hZf1N6jaWya3a9qjb7c/wDtt/ssycsJCs5kkyKJIYwFIviUGRN9t3Ax38Hfxe2xeZj7fOU4RjGuUnz53wvPp1L55JjeaSITdIRFIssC5kl6DSubZDBbI/z6+5rBN2kenfFnmXkC306gkgAMDERZyIjYd5yH547ttx4qN/FizBi4Cx1DQknBXkXqYmzCMkGw9n7X91vih4klE59TqPBx76s1JOTu6wlNvkrb2Pv9zXa9CuzPNX4x7tuP1ItTy3EhN5SdwBa3k1D0kI9WWh+JZZpVD1MviXCxFIseV8v9Kxy4FBpX1O3T6p5cbnXQungaL5Y1r7NFdTm9unLoixJwKMLetPZoUZx12RyozIOGqSbmsVhjZ2T1LSLkXDEFX8GJzy1Uz5qNGoFUnhjXQtj1E7MiXT77GuCTp0d0cja5KtWNRQCgFAKAUB1PCOcGg05hWO5tYEnb+Koocth8n3i/O0k6KOmFdWVsrncr428VO3imO9kMnNz/AIn8UsMauUZWtlZshYk7+amuF6DzMfT6/CJ4unGS5U9Qr+YmJv2tfa/ulEptO0dmnPMIMLdNiyuZJWwRSzdExjbMhvq3O3jxXGtLKnb+7PSeuhfTzMOPm+cPkEhxtGFjwPTTpkshUZXuCzHcnya38CNVz/ycy1c77fl0ryK6auPqDU9V+tn1bCFSmeWVrma9r/bxV6dVXBlcb3Xz8P7LR5s1JsCUIAsVKAqwKKtmB8iyL+4vUeDEt7TkPkPM+pTZDGgBJCrGgUXKE2FrDeNf9fmp8KJHtE1wiNuYtSTGeoLxsHUhI7l1XEMxx7yF2u16hYopUQ9RNtMh4fxIwxTIgOUyCMtl2hL3Pbbcm1sr7AnbeplDdJPyIhl2xcV3PqaiKIiSB5RIp2zSPHcWNxk19iRYjeppy4kgpRhzBu/kfW49qCWOa3KhLiOIEKFwspCXTt27bU8OI8fI+5PpuZZwy9Ri6i91AjUsTGY7s3TOXabdwa481V4YtcFo6madsi13MWolaU5ALKxJWykC6he0kXXtAFxa9qRxRVehEtROV88Mx2FamB5ViCCPRuKgmi7pOJakPIYpHzlvnje7eSTt7+o3HjerJu+DKWLFtSklS6eh6l4nqukitJIIypVL3xKgYkA23sO3/Sm51Q9nxbnLar+3+pFJxjUMroZnKuSXF9mJte/8D+Kbn5j2fFuU9qtdGaOh5t1MXWIILzoqM5zBAVMBZVYITifLKfnzVEkmmbdqI9dzXrJZuv13RgCqhGYKim11UXNhsP4FNqqgUk4lPdfzHOLMy7n6mPcR9z7q0W07XUzyQhOLjJcEuq4xqGZiXYXNyBcC/wD6K3nnyt22YY9Hp4pJRTPkEuokYNZn7r7g2JpGWWTvqJxwY4uLpEmvSc5SSR2IPn4rSfiPlorhlhVQhIqq8z7gsayTyS6GzWKHDouAaltq3j4ncwvTx5PI00y0kpLkeJhkeG1jr5rBajmiywwl0IZde7VM83HBrDTRRGqsfdcbkjujpuCtWhgKAUAoBQCgOx5b5Vi1GmaQsxfewHq1UU+aD6GrqeUINKkc2YZ1KEq9irZG3j96XcWx0aPUHCdN/jJjkh/LYZRoAOmThfcEbj7D3ST4XqRDvZxvF4utNPLDCwiVt7KMYx43xGK71eTVkw5o66HkXTkopbUX6kSM3Zg4eEvePt9EAbk1we1Spvj7dcnq+w47rkqrydEwBVZ1ZlhbpMQZEDzmN8rINrAMDYWvvetPaGvLv9Cj0ceKvquPJM5vWaJE1bwZYos7R5N5CiQrc+thvXTuezd6HDsXibe119Tsxy/pYNTpg2nfGSeaG0rghgmIRwMRcNc7eNxb1XMsspQbvyO14IRklXXd9Ohk6bSoYNYp0NpozGQjGQyxqb3NrhgF2Yn/ALhfa1a29654ZzKKeOXHJj8v6ZJZljfcMslhe13ETFBe/twtXyScVaM8MYylT8mbw4RpwsysFDpFGc2luiudOGcALIGLGQ7drr6tWe+Vx9f5Oh4saT/klHCtD00OULSWvbrWWQ/h2YZfnkqvUABa0fsfeq78n2vX4ErHi+36Eur0HD4vxCsiZgDt6oBT/wDHRgULyXa7lvAY+B4pCc5V5DJDFFPhX8f0OT4NLAsl9QuSYnYKzd1x6WaI/P8AV+3x1I4obe5BxN4zI5hGKE9osVsLfDSSEb3/AKz/ALCXXYh9Tpo9XpG1Ei46ZEQKImZOxhknULWByYqHtfxc2ttVrVnHOORRVX3un8aPWl1HDVxc9PG62RkYsMHmJy7SDcGEeTf9qlbfv4/wZyjqXxz3548uPqeNHxbSKGcGJJDH3fkkFmOlK2jxS0Z6xN7Yg/JFTCcU7KZdPmk9vLV8c/8AtfPPKr4mny3JBNPAqmO66GJQXRXSJlnHWyVhYFl6u58dS9xe452en5lzU8Y0EHSz6bK7GQKsKnphtRO3ULAbjBo1w+B4FhR39/EUcZxefSNIGRyyxJpo1UR2EwSMCViSe3dT5Bver30KtSp0dBrOP6TsJbIEZCyLcWkchCAe2wx8+hXqvUYUl91yfO49DqveSVc11fkufUz9XzRFZOmtsY2AGFirFQPN9x5Owqj1eOlX6G+P8LyXLe7trv1V+VFPiesEsEUYZWkIvIbj14ufneqTnvxKPFs6NPh8LNKbTUVwkXdPxWOLToLjIEAgEevNaQyRx46ZzT0mTLnk649TM13GBIjICdzcXrOWeM00mdmHRvHNSroeeH8UjjQKRuKiGWEFTJz6WeSdouwccjrWOoic89DkIddxhDsKplzRo0w6Oa6mHqdTlXm1zZ6UMe0hDVJspNFhNTYVm4HTHUKirWhyCgFAKAUAoDU4fx+eBDHG9lP233qNquwe5OOauZBAZGYEgBR5PxSkh1PWq1mu60au0vWTtjG+Yv8AFvmnCQ6sp6jrwF4nMkZa3UQkjL2Mh7+d6n1Bpxc36lViVcAISCuxORClRldj6J2FhvWHs8OfU6/bcvFVwY7a2UsXMj5EWLZNcj4ve9q22rpRzb5dbLC65cbGCItbdyZsifn/ADcb/tam131J3qv8V9f5Peu4pJPiJGUhL4hURFFzucUUC5sLnybCkYqPQTySn/kyrcD42/T/APlWKIttqJJrRhEJYiwjhjDk/AKIGP6VCikTKblxx+SPv+FT2Y/h5bR/Wem9k2B7jbt2IO/o1JQKk8JEmMsRUgBrMpUstx3bEErv9wfioaTVMlNrlHqLQaiZZJljeRVu0j7m1hkxLHybbmrKPHBWUueXyfRwXUZY9IggspuVAUoqlrkmygB03JtuKtsl5FHkiu57Tl/Un/p2/M6Xc8akyAgFQGYEnuHj9fFPDl5DxYefqUNXo5Iwua45AkXIuQGKna9x3Kw3+Khxa6l4yUuhfHLWoIQ2SzgNfqL2K0ZkDPv2DBWbf+01KxSasy9px21+z8648+T2/KWqBAwBuGIYG69qs3kf3KpI+bireBMr7Zirr/JJq+UJ4mKytHGBGZGZi+IAcIR9GROTDwCD6JqfZ5en/BRa7HJXFN81XfnnzGl4FHloUd2J1TnLC3ahl6SEXHklZDv6ttXO3SfodiZhaqEo7ITcqxW/zY2/2qzJRFUAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgO95B0sDwuJFXK53a1ZtvcS+hta6HRx6S8apdRcMCAQwP81MVd2Q30K2o4jGnEdLqupEUdFViSCVsPP2/Wo5cEFxJnIcVI1U+qmaaJMLlBa3VsbALb3b3WrfNER6HX6vVaKFYBOIiMdK6osfeu13ZiF3BFvZvXmwjkknXr+p7eSeGDSlX5ehWl4zw6T8vUssvarNIkbKGcO6iwCg9scl72sSgG9X8PMuYFHn0z92Z54nzVppNPOkfTUsZRi0UhMgJtGwKuEBCBBdwSuO3mrwwyjJX+pll1OOUHX5V+5znM3GjqJAFkYwqsYRDsqkRKrEL8lg2/ut8OPZHnqcmozeJN+XYscF5sk00BgSNSCWNzJOp7vtHIo/0rojJR7ff5GamttV9/kV+UdUsepUu2KsksZfLEoJImXINY2Iv/tWbKROs4pzbpkzMZeV1mJj7iFNtFHBm5Kd6k5/BNvg0S8/QN/uYHE+Zop1RW0zf5kUkv5uz9OERYrZAUBAve5IuaJcEWiHhHHI0ikieP8Ap1PSYMboZogmJFu4XRO42tv59axnSoylBtpp+RZPObB81hxyMhktK4LGTp3KstmSxhSwBO1wb1PiuqoosPr98/yY2t4q02IkuqiV5MgWaQdQrfd3uxAQWuQT7NVlO1ReGNRbfmv0LPG+IxayeSaSRowSAiiMMcQNie4AEm7EfJNTKSm7bM4QniiowV+fNfsyTVc1PdBEiKiIqEMtzIBD0jnvuMS4AFrZfO9WebhJFYaRcuTdu/lbvj6ED816ohlzADkk2UC30WA+ABEoA9C/yahaiaTSfUn2HA5KTVtf3/JT1nGZZC5bEdRcXxRFyGee+I85AG/moeWT+ZpDTY4VV8cq23XFfoetPxyVOgVxvp8ukStyMiW/ezMWHwTWTV8G1GaTQk+qhPgE/tUpNkNpdSaPRSMbBG8geDsT8/FWUJPsUlmhFW2iWThUylgUIw8//XzV3gmnTRmtViaTUup8/wAMmtfA+L1HgT8ifacXTcR6bRvJ9IvUQxSl0LZM0Mf+TLycEb+o2rdaV9znetj/AKnscDP91W9lK+3LyEnBLDzR6ZJER1tvoZ+o0uNcclTo64ZdxFClzVJOkdOOG58mvFoEtvXJLNKy8opMxK7TAUAoBQCgFAXuG6KeS/RDG3mxIFRasFmHgGpZblGCX3J8D5NqWgXtTyfKNRFAjK5lXIN4AHu/81G7iwuXRQ5l4KdHOYS4cgA3At5v/wDFWIA4Dqn/AOmx7YyNx9LmyW39n1WXjY13Or2bK30L+j5Tfq9LUEoWjkeMpi6sYwSQWDbWIttc1R51ScfOi0dK7alw6sqQcAy0h1fXiFnwwJORNibbf1G2w+N71p4nv7aMlhuG60XpuStQmJZowhR3Mh6gVQgBN7pkfqW2IIN9qotRFrg0ejyJ8tfGyduRdQolLSwgR3AOTYuQiubEqLbMBc2udqlaiLaSXUPSSim5NGLwLhT6qTpIQDiWuVkIsLeo1Y+/i33roXLOaEHJ0fON8OOmlMLMGKgEkBgNwD4YA+/ipaorJU6NaDgEJKKZJWb8ONRIqov0lMsUuxLNcruQBa59Uq6OR6hpN0quuv1fBZm5QC9SzOyp+IuwAsvTSMoG2NiTIQR8rtSUa6ffFlVqrSddf7/gsjljTiUhRM4VpV6ZZMnMeoSMtcJYKA7MRb+nza5EuK7FHqZbeaXCd/FN+fUPwvTu8aMESOXiOoSRwFGCpj04w1rIpzf7e/6ds58X8TtxO4xvyNbU8raFELyRLEuMXUvqD+VnBI7Yd1pGyEQC917+N71Ctv78y9nP8e4Po/yl00sCtJIbMZ7qsY08R7+5sLyGbYi99vFqlcojlM98A0+k/CrJIsTYshmJyMqk6lR48YdK/wCpJrswxxuFv5/meZqJ51m2xvm6qq/xf1s9tNw6OFlxhklEQBPcFY2f6T0ycgSu/bsF38irrwYt9PuzNrVTkn7yV+np1Vrjr5/Ag4fqtO8mJjiMEenTIiNFYyKiFjcgMxZ0I9+T80wyg2o0qrknU480YXFve5cctqnfyVLkpcCQjU9WVAivnixxCozAkEAkDaq403l3tUmX1kk9P4eN21Vrm3XwLvEOY4hKQtynWLOVAGS4gC1vuL1tl1MIyaXnyc+H8OyPHcuu2lfZ2XNVzbBiGUMST9O3q25/itXrMW2znx/hObdUmq8zLfmZGyLI1yLDx81i9ZB9Udi/DJxpJqiu/MIOVkPcLVT2qJqvw9quehR0HE+jlYXB3qkc0YPg6c2m8WrJZ+OM39NTLVpmcNDGPcQ8bI8ii1KEtEn0Y1PGi3gVM9Qmhj0Sj1MyWct5rik7dnZGCj0I1a1QaKTXQlGpb5qmyPkWc2yGrlBQCgFAKAUB1vJHHY9PmshsD/rVGubJ7G9qOeIOiyLcHcAAeb1MVTIfQxNXzVEzaaUI/UhsDvsR/wC2qNvu0O9mVqeLxSTzzSwlxIDgCxGBPg7eav3RCVIswc3ypBDEqreJ1bM+WCklVI+ATXN7NG5PzO9a6SUVXT6ibm6QyxyJFGixiQCPuKnq3zuSb73/AGqywKqb+ZV6yW664qqKMHHWRJI1iiwdxIAQx6bgWBQlr7A/1Xq7xpu2/QyjncVSS62akPOspcGVFKEyF1jVB1DIAGLZq4N7DyPVZvTqqRvHWyb99cclXiPNmoleVgVVZGywxRse0J2sy3U4gAlbXq8MEY16GM9VkldcJmFWxzH2gL0qaiMRTsXXIflPn3WXt23yAHgevirU6sotjuK+ZVLuQTdsSbsbmxJ9n1eoLUi1puEzPJ0yhRijSd4KgIqlmY3Hiyk3qHwE0+h9EU0McOoV7K7sUKsbq8ZHkemAZT+jCo6k9yvq+IzS5dSV3ybJsmJuwFgSCfIG1/jahJUoD7egPlAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKA6PkvhUU8h6vgeqrJ8knRNyLHMXaNsQPAHim4gjl5AiGP5x8gN491G7gHOc38CGklCKSVZbgmrrpZCfNGg/LOmGk6/4j8zDIJdLXt4te9axxpqzeWNJWZ/JvDYtRqOnMGZcCQFvudrXIuQN/VRjipSpnFqMkscLidLFyto1gnZ7s6vKOxwRFj9O5Zb3+SDXQsMbZxPV5GlX6CbhfDhMoWNMVlkjK9fZgIlZWbOQDZmOwZQfFR4cCVmz18r6epEkHDkE4LadxnKGPcGx6X5XQGR/6hIJufHm1TtxqT6faLbs7S4f933+RRh4nphPp16em6SQRly0fmUwWbJhG7EhydirLcePdZJxVLj1N5QnUnbu+PgZPF9EZZpZNNHI8JYlXEVgR72RQoF7+AP0FROLlJuK4LY8sYRUcjSflf8AZuxc3r1YnklmIj0ojH1ELNtkcVkQkEC1ww9eharLIuF6fUxennUvWV/I88T5xidZEjSRUYS2XtChn1Kyq2NyLhVI8eT8VMs0e3r+whpZKm6tV9L/AJIdXzVE+oeTB8ZNNLA7G2ZaQMQ+IsosxXYW2B+aplyKbXoa6bA8UWm+5h6riIOlh06gjB5JHJt3O+Ki32CRp+5NYnT3M2gPlAKAUBPBpHcOyqSEGTH0Be1AetXoJImxdCCFDfPaRcG49UsFagFAKAUAoBQCgFAKAUAoBQCgFAKAUAoDQ4Nq5I3vELk+qhxslJvobi80auEFSlr08NkuLKEnM+rPdlYXHrbamwimUddrZ9U+TlnIFth4H7VJBXXRykXEbkeL4nz/ABQFmPhepDALFKGbxZWuaKVckNJ8MpzxMjFXUqw8gggj+am2SSaPRSSlhGhYqpdrelXyf2qAasfKOsKyN0v8sBmGSZWKhtlyue0g1Cd8B8ck3EuWMXCwSdRfwn4olwEISxJFgW32+aJ2l6h8WWpuQdWsMsrNGFhDGxZu7FAzY9tvBtuRc3tepUr4Qarky+VOHR6jUrFKxAIYgb9xCkgXB7fBN/tVoJOSTLQVssnltfwP4rrHPDqdPDtC9fo/Xl5vY+PF6soXGyzx1HdZNyJFps9RJqIjL0YHlVbjG4IBuCDc9wt683vWfdGT6G6eTNLHp4p5S5ODPIgkAV7aZpRiemLdyquxbyRe4qI3IPhlfi/ANDHp9YyEZxyDpM0oPaVjOKhWuWuzi7KQQPIpF2+fIh3Rj8G0SxvqEebT/wCSVV+psWdbjEjz5sa6tKlu58jj1rklDam/eV0r4RoaLielI03VENkiZSMNxJc2LWXdTcn3vvW8JYtsVKuL+/gcObBqby7N1tqueK9PUsS8w6ILiqKO6+0e313+xrZ58CTXH5HPH8P1jluk308/QzeI8dgdNWi5Ay9IqbecCbj7Df3XDqZxnl3R8j2NFhniwqE+qIuI8xIzSYhrGBYVN7ePZ+RXLGNUddHN4n4qxNHttO48o3i/g+KWCKgFAKAUAoBQCgFAKAUAoBQCgFAKA3uUdQiS91qtE3xUduk2nfItjW6pmySOe5m4hCsHTiC3O3qqt0jLK1RFyPxiHTrJ1CAxItf9q5JJ2Ydjr4ecNCiNuNyTa3u9KbII2/4kabIdrHyL4+Lj1eoUWScdx3iul1J1EzBzMxQReth5JttWvcrRk8u8XbSTrMqhrXDKfDKRYg1WUbLJ0dDD/wARJ1EwESXlZ2vdtg642IBAawsBfxUpe9ZVq1RmQ83Tr0rRwkxxGG5S5eMi2L3NiBUbS1kmu5m10sUjOLxSs126S4gsAGCOR23CjYGpVWQyhpZtXosZkzh6qnB7WyX7XHjxvVk65RaM3HoVZNfPKcTJI5bbHJjldsrW99xLW+d6lzb6shybPcXCtT34wTdq3eyNsp37ttgbX3+KrZFl4cpa8lR+Gk7vpvYDYX8k2A/Wq7lVgyNZpXido5FKupsynyDVgnZp8G5cm1KGSPHFWKsSfpsha5FvBtb9ai+wOi0nIvTZfxBzWSGRlwJBR0UHcEb1EXdMhuuD5wn/AIf9QIzzYhgpNl+VJIB+RYVVzfYlFuHlvTRAxtZwZ8eow3sBe1/W9c+ryThjlKPWjbTxUppSJ9Zw7Tok4RExOA8DY3rn/D8uWcLmaaqEYy90gn6ecobAdgA8VGs3bo7bLaetkrKev18SCzEH8u1ehBOkcb6nDsd61B8oBQCgFAKAUAoBQCgFAKAUAoBQH0G1AnR7Ezf3H+ancy2+XmeCagqaPBuFnUMQDa1WhHc6OTV6pYI20bKcodpZntb9K18E4P8Aq1uoxLE/K0BeNUZrFbtRY0JfiU4xbJ5eWII4prq7utiCD4FWeJJmeL8Ry5Wn0PE/BtKzae0bKjL3HLybeP5qNkaREdbmSyc8roiPQRwHTa4xIFYBVAJucAe4gnxesJ1vpeR7GDf4SeR2/wAjo10HCklgLCIDptZCb3awsXNyD78isuXFHR3ZicW4jpjBq4YpEjCzrLEm7IbLuF2tu1/tV695/Ar2RBx7isGv1CdSfCGLTjcIAeoF3UC3s2/iojaikH1bOe5b4kum1MU7KWEbZEDydj81Mlaok7HSf8R0RTeBmcxqhYsLtZWG9wT/AFX2qHHmyK4Ij/xPlB2gW24Pe1yDf2Bt5/0psRJzHFeNCdGDRASPMZWkuS1itgtzvYVYhIg4bxqeBJY4nxWUAPt8eLfFRXNklnUc1ax2VjM10viQAPIsfW96JKqBcaHiGEZ6j2O6rfcf+3rpWlm47vM4V+IYNzjfQjGg1zpgWOLNlYne/wA/NFpJvqg/xHBHoyppNJO8hgzI3u25tVY6Zqe01y6yMcXivk1X5Ve92kJrr9go87/rCrhE8/LUYAJJ9DyavPSRUTPF+JTlOilr+GRIrbDx5rymqZ7ifBzNSWFAKAUAoBQCgFAf/9k=",
    progress: 75,
    status: "ongoing",
    totalLessons: 12,
    completedLessons: 9,
  },
  {
    id: 2,
    title: "Advanced JavaScript Concepts",
    thumbnail: "/placeholder.svg?height=100&width=200",
    progress: 100,
    status: "completed",
    totalLessons: 15,
    completedLessons: 15,
  },
  {
    id: 3,
    title: "CSS Flexbox Mastery",
    thumbnail: "https://www.google.com/imgres?q=css%20&imgurl=https%3A%2F%2Fwww.oxfordwebstudio.com%2Fuser%2Fpages%2F06.da-li-znate%2Fsta-je-css%2Fsta-je-css.png&imgrefurl=https%3A%2F%2Fwww.oxfordwebstudio.com%2Fen%2Fdid-you-know%2Fwhat-is-css&docid=59J_qI_HmH6OwM&tbnid=Rlb5ahUICUuifM&vet=12ahUKEwj925rL9qGIAxW1XmwGHZbUO7wQM3oECGwQAA..i&w=1000&h=600&hcb=2&ved=2ahUKEwj925rL9qGIAxW1XmwGHZbUO7wQM3oECGwQAA",
    progress: 40,
    status: "ongoing",
    totalLessons: 10,
    completedLessons: 4,
  },
  {
    id: 4,
    title: "Node.js Fundamentals",
    thumbnail: "/placeholder.svg?height=100&width=200",
    progress: 100,
    status: "completed",
    totalLessons: 8,
    completedLessons: 8,
  },
]

export function StudentCourses() {
  const [activeTab, setActiveTab] = useState("ongoing")

  const filteredCourses = courses.filter(course => course.status === activeTab)

  return (
    (<div className="container mx-auto px-4 py-8">
      <div
        className="mb-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome back, Student!</h1>
        <p className="text-xl mb-6">Ready to continue your learning journey?</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/10 backdrop-blur-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Courses in Progress</CardTitle>
              <BookOpen className="h-4 w-4 text-muted" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Hours Spent</CardTitle>
              <Clock className="h-4 w-4 text-muted" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Certificates Earned</CardTitle>
              <Award className="h-4 w-4 text-muted" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Tabs defaultValue="ongoing" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ongoing" onClick={() => setActiveTab("ongoing")}>Ongoing Courses</TabsTrigger>
          <TabsTrigger value="completed" onClick={() => setActiveTab("completed")}>Completed Courses</TabsTrigger>
        </TabsList>
        <TabsContent value="ongoing" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <Card key={course.id} className="overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover" />
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={course.progress} className="w-full" />
                  <p className="text-sm text-muted-foreground mt-2">
                    {course.completedLessons} of {course.totalLessons} lessons completed
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="secondary">{course.status}</Badge>
                  <Button variant="ghost">
                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <Card key={course.id} className="overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover" />
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={course.progress} className="w-full" />
                  <p className="text-sm text-muted-foreground mt-2">
                    Course completed
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Badge variant="secondary">{course.status}</Badge>
                  <Button variant="ghost">
                    Review <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>)
  );
}